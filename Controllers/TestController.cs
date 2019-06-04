using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic; 
using System.Linq;
using System.Threading.Tasks;
using WinfADD.Models;
using WinfADD.Persistence;

namespace WinfADD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : Controller
    {


        private readonly ITestRepository _testRepo;

        public TestController(ITestRepository testRepo)
        {
            _testRepo = testRepo;
        }


        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<List<Test>>> GetAll()
        {
            return await  _testRepo.GetAll();
        }

        [HttpGet]
        [Route("{KeyString}")]
        public async Task<ActionResult<Test>> GetByID(string KeyString)
        {
            return await _testRepo.GetByID(KeyString);
        }

        [Route("delete/{KeyString}")]
        [HttpDelete]
        public async Task<bool> Delete(string KeyString)
        {
            Console.Write("..............................  " +KeyString+ "  ...........................");
            return await _testRepo.DeleteTest(KeyString);
        }

        [Route("update/{testObj}")]
        [HttpPut]
        public async Task<bool> Update([FromBody] Test testObj)
        {
            Console.Write("\n KeyString: " +testObj.KeyString);
            Console.Write("\n Id: " +testObj.Id);
            Console.Write("\n name: " + testObj.Name);
            Console.Write("\n random: " + testObj.Random);

            return await _testRepo.UpdateTest(testObj);
        }


        [Route("add/{KeyString}")]
        [HttpPost]
        public bool Post([FromBody]Test testObj, string KeyString)
        {
            if (!KeyString.Equals(testObj.KeyString))
            {
                Console.Write("\n KeyString does not match the body");
            }
            return  _testRepo.InsertTest(testObj);
        }
    }
}