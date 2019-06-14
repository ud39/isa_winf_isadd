using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json.Linq;
using WinfADD.Models;
using WinfADD.Repositories;


namespace WinfADD.Controllers
{

    [Produces("application/json")]
    [Route("api/[controller]")]
    public class UploadController  : Controller
    {


        private IHostingEnvironment _hostingEnvironment;
        protected  IConfiguration _config;

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
                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }
                if (file.Length > 0)
                {
                    string fileName = Path.GetRandomFileName() + ".png";
                    //ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.ToString().Trim('"');
                    string fullPath = Path.Combine(newPath, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }

                //TODO add to Image Table



                return Json("Upload Successful: fileName");
            }
            catch (System.Exception ex)
            {
                Console.WriteLine("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
                return Json("Upload Failed: " + ex.Message);
            }
        }
    }
}