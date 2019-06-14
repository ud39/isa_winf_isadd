using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using WinfADD.Models;
using WinfADD.Repositories;

namespace WinfADD.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public abstract class GenericTableController<Table> : Controller where Table : class
    {
        private readonly ITableRepository<Table> _tableRepo;

        public GenericTableController(ITableRepository<Table> tableRepo)
        {
            _tableRepo = tableRepo;
        }


        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<List<Table>>> GetAll()
        {
            return await  _tableRepo.GetAll();
        }

        [HttpGet]
        [Route("GetById")]
       public async Task<ActionResult<Table>> GetByID([FromQuery] Table tableObj)
       {


           return await _tableRepo.GetByID(tableObj);

        }


        [Route("getByParam")]
        [HttpGet]
        public async Task<IEnumerable<Table>> GetTables([FromQuery] IDictionary<string,string> tableDictionary, [FromQuery] Table tableObj)
        {

            var tables = await _tableRepo.GetTables(tableObj, tableDictionary);
            return tables;
        }


        //TODO maybe handle chaning natural key-> new insert+delete
        [Route("update")]
        [HttpPut]
        public async Task<bool> Update([FromBody] Table tableObj)
        {
            return await _tableRepo.UpdateTable(tableObj);
        }



        [Route("delete")]
        [HttpDelete]
        public async Task<bool> Delete([FromBody] Table tableObj)
        {
            return await _tableRepo.DeleteTable(tableObj);
        }


        [Route("add")]
        [HttpPost]
        public async Task<bool> Post(JToken tableJson)
        {
            //create tableObj like: [FromBody] Table tableObj
            var tableObj = tableJson.ToObject<Table>();

            //create a List of all search properties
            var hashtableJson = tableJson.ToObject<Dictionary<string, string>>();



            return await _tableRepo.InsertTable(tableObj, hashtableJson);
        }





        //TODO pUpdate //TODO WHERE key? || others?
        [Route("pupdate")]
        [HttpPatch]
        public async Task<bool> PartialUpdate(JToken tableJson)
        {
            //create tableObj like: [FromBody] Table tableObj
            Table tableObj = tableJson.ToObject<Table>();

            //create a List of all keys in the Json
            var keys = tableJson.ToObject<Dictionary<string, string>>();

            return await _tableRepo.PartialUpdateTable(tableObj, keys);
        }
    }
}