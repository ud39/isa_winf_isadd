using System;
using System.Collections;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic; 
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Dapper;
using Newtonsoft.Json.Linq;
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

        //TODO maybe handle chaning natural key-> new insert+delete
        [Route("update")]
        [HttpPut]
        public async Task<bool> Update([FromBody] Test testObj)
        {
            return await _testRepo.UpdateTest(testObj);
        }

        //TODO pUpdate //TODO WHERE key? || others?
        [Route("pupdate")]
        [HttpPatch]
        public async Task<bool> PartialUpdate(JToken testJson)
        {
            //create testObj like: [FromBody] Test testObj
            Test testObj = testJson.ToObject<Test>();

            //create a List of all keys in the Json
            IDictionary<string, string> keys = new Dictionary<string, string>();
            var keyValuePair = testJson.ToObject<Dictionary<string, string>>();
            int counter = 0;
            foreach(KeyValuePair<string, string> entry in keyValuePair)
            {
                Console.WriteLine("\n  ::  " + entry.Key + "->:: "+ entry.Value +"\n");
                keys.Add(entry.Key, entry.Value);
            }

            return await _testRepo.PartialUpdateTest(testObj, keys);
        }



        [Route("add")]
        [HttpPost]
        public bool Post([FromBody]Test testObj, string KeyString)
        {
            return  _testRepo.InsertTest(testObj);
        }


        [Route("get")]
        [HttpGet]
        public async Task<IEnumerable<Test>> GetTests(JToken testJson)
        {

            //create testObj like: [FromBody] Test testObj
            var testObj = testJson.ToObject<Test>();

            //create a List of all search properties
            IDictionary<string, string> searchProperties = new Dictionary<string, string>();
            var keyValuePair = testJson.ToObject<Dictionary<string, string>>();
            int counter = 0;
            foreach(KeyValuePair<string, string> entry in keyValuePair)
            {
                Console.WriteLine("\n  ::  " + entry.Key + "->:: "+ entry.Value +"\n");
                searchProperties.Add(entry.Key, entry.Value);
            }



            Console.Write("NAME OF THE CUSTOMER SEARCH QUERRY: " + testObj.Name);
            var tests = await _testRepo.GetTests(testObj, searchProperties);

            return tests;
        }
    }
}