using System;
using System.Collections.Generic;
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


            if (deleteImageInternal(imageObj.FileName, imageObj.FileName))
            {
                return Json( "Deleted::"+imageObj.FileName);
            }
            else
            {
                return Json("Failed to delete Image");
            }
       }


       //delete Image method for internal use only
       public static bool deleteImageInternal(string fileName, string contentType)
       {

           //TODO change path
           var path = "C:/Users/Jan/RiderProjects/isa_winf_isadd/wwwroot/Image/";

           //TODO add to list
           var _accessibleFolders = new List<string>();
           _accessibleFolders.Add("gallery");
           _accessibleFolders.Add("front");
           _accessibleFolders.Add("preview");
           _accessibleFolders.Add("event");
           _accessibleFolders.Add("equipment");
           _accessibleFolders.Add("busstation");
           _accessibleFolders.Add("poi");
           _accessibleFolders.Add("articleBean");
           _accessibleFolders.Add("articleBlend");
           _accessibleFolders.Add("articleCoffeeDrink");
           _accessibleFolders.Add("articleEquipment");


           if (_accessibleFolders.Contains(contentType))
           {
               System.IO.File.Delete(path + contentType +"/"+fileName);
           }
           else
           {
               Console.WriteLine("Error: Couldn't find Image! at::"+path + "/../" + fileName );
               return false;
           }



           return true;
       }
    }
}