using System;
using System.Data;
using System.Globalization;
using System.IO;
using System.Net.Http;
using System.Reflection;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using WinfADD.Models;
using Microsoft.Net.Http.Headers;

namespace WinfADD.Controllers
{

    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ImageController  : Controller
    {


        private IHostingEnvironment _hostingEnvironment;
        protected  IConfiguration _config;
        private IDbConnection Connection => new NpgsqlConnection(_config["ConnectionStrings:DefaultConnection"]);


        public ImageController(IHostingEnvironment hostingEnvironment, IConfiguration config)
        {
            _hostingEnvironment = hostingEnvironment;
            _config = config;


            var defaultMapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {

                var result = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(columnName.ToLower());
                return type.GetProperty(result = result.Replace("_", ""));
            });

            CustomPropertyTypeMap CreateDefaultMap (Type t)
            {
                return new CustomPropertyTypeMap(
                    t,
                    (type, columnName) => defaultMapper(type, columnName));
            }



            SqlMapper.SetTypeMap(typeof(Image), CreateDefaultMap(typeof(Image)));

        }



        [HttpPost, DisableRequestSizeLimit]
        public ActionResult UploadFile()
        {

            try
            {

                string fromWhere = Request.Form["fromWhere"];


                var file = Request.Form.Files[0];
                string folderName = "Image/"+fromWhere;
                string webRootPath = _hostingEnvironment.WebRootPath;
                Console.WriteLine(webRootPath);
                string newPath = Path.Combine(webRootPath, folderName);
                var fileName = "";
                var imageType = "";
                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }
                if (file.Length > 0)
                {


                    //check for valid image typ
                    imageType = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.ToString()
                        .Trim('"');
                    imageType = imageType.Substring(imageType.Length - 3);

                    if (!(imageType.ToLower().Equals("png"))
                        && !(imageType.ToLower().Equals("jpg"))
                        && !(imageType.ToLower().Equals("jpeg"))
                        && !(imageType.ToLower().Equals("gif"))) return null;

                    fileName = Path.GetRandomFileName() + "." +imageType;



                    string fullPath = Path.Combine(newPath, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }

                //Insert into Table
                using (IDbConnection conn = Connection)
                {
                    Console.WriteLine("\n CreateImage::");
                    var sql = "INSERT INTO image (file_name, content_type) VALUES (@file_name, @content_type)";
                    var affectedRows =  conn.Query<Image>(sql,new{file_name = fileName, content_type = fromWhere });
                }



                return Json( fileName.ToString());
            }
            catch (System.Exception ex)
            {
                return Json("Upload Failed: " + ex.Message);
            }
        }

        [HttpGet("GetById")]
        public ActionResult GetImage([FromQuery] Image imageObj)
        {

            if (imageObj.FileName.Contains("..")) return null;


            var path = Path.Combine("/Image/"+imageObj.ContentType, imageObj.FileName);
            return base.File(path, "image/" + imageObj.FileName.Substring(imageObj.FileName.Length-3));
        }


        [HttpDelete]
        [Route("delete")]
       public async Task<ActionResult> DeleteImage([FromQuery] Image imageObj)
       {

            //delete from table
            using (IDbConnection conn = Connection)
            {
                Console.WriteLine("\n DeleteImage::"+imageObj.FileName +", from:"+imageObj.ContentType);
                var sql = "DELETE  FROM image WHERE file_name = @file_name";
                var affectedRows =  conn.Execute(sql,new{file_name = imageObj.FileName});
            }


            //TODO change path
            var path = "C:/Users/Jan/RiderProjects/isa_winf_isadd/wwwroot/Upload/";
            switch (imageObj.ContentType)
            {
                case "gallery":
                    System.IO.File.Delete(path + "gallery/"+imageObj.FileName);
                    break;
                case "front":
                    System.IO.File.Delete(path +"front/"+imageObj.FileName);
                    break;
                case "preview":
                    System.IO.File.Delete(path +"preview/"+imageObj.FileName);
                    break;
                default:
                    Console.WriteLine("Error: Couldn't find Image! at::"+path + "/../" + imageObj.FileName );
                    break;
            }



            return Json( "Deleted::"+imageObj.FileName);
        }

    }
}