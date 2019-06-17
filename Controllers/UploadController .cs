using System;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using WinfADD.Models;
using System.Web;
using Microsoft.Net.Http.Headers;

namespace WinfADD.Controllers
{

    [Produces("application/json")]
    [Route("api/[controller]")]
    public class UploadController  : Controller
    {


        private IHostingEnvironment _hostingEnvironment;
        protected  IConfiguration _config;
        private IDbConnection Connection => new NpgsqlConnection(_config["ConnectionStrings:DefaultConnection"]);


        public UploadController(IHostingEnvironment hostingEnvironment, IConfiguration config)
        {
            _hostingEnvironment = hostingEnvironment;
            _config = config;
        }



        [HttpPost, DisableRequestSizeLimit]
        public ActionResult UploadFile()
        { Console.WriteLine("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC");

            try
            {

                var fromWhere = Request.Form["fromWhere"];


                var file = Request.Form.Files[0];
                string folderName = "Upload/"+fromWhere;
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
                    var sql = "INSERT INTO image (file_name) VALUES (@file_name)";
                    var affectedRows =  conn.Query<Image>(sql,new{file_name = fileName});
                }



                return Json( fileName.ToString());
            }
            catch (System.Exception ex)
            {
                return Json("Upload Failed: " + ex.Message);
            }
        }

        [HttpGet("GetById")]
        public ActionResult GetImage([FromQuery] string file_name)
        {

            if (file_name.Contains("..")) return null;

            var path = Path.Combine("/Upload/", file_name);
            return base.File(path, "image/" + file_name.Substring(file_name.Length-3));
        }


        [HttpDelete]
        [Route("delete")]
        public async Task<bool> DeleteImage()
        {

            Console.WriteLine("<---------------------------------------------------------->");
            Console.WriteLine("DEEEEEEEEEEEEEEEEEEEEEEEELETE::"+"imageObj.File_Name");
            //delete from table
            using (IDbConnection conn = Connection)
            {
                Console.WriteLine("\n DeleteImage::");
                var sql = "DELETE  FROM image WHERE file_name = @file_name";
                var affectedRows =  conn.ExecuteAsync(sql,new{file_name = "imageObj.File_Name"});
            }

            //TODO delete actual file

            return false;
        }

    }
}