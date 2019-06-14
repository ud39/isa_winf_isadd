using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
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

        public UploadController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }



        [HttpPost, DisableRequestSizeLimit]
        public ActionResult UploadFile()
        { Console.WriteLine("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC");

            try
            {
                var file = Request.Form.Files[0];
                string folderName = "Upload";
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
                return Json("Upload Failed: " + ex.Message);
            }
        }


        [HttpPost ("SetImageType")]
        public bool AddImage(JToken JsonObj)
        {

            Console.WriteLine("---------------------------------------- \n " + JsonObj.First);
            //create a List of all search properties
            var hashtableJson = JsonObj.ToObject<Dictionary<string, string>>();

            // _imageRepository.InsertTable()
            //var tables = await _tableRepo.GetTables(tableObj, hashtableJson);




            return false;
        }
    }
}