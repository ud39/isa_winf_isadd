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
    public abstract class GenericTableController<Table> : Controller
    {
        public readonly ITableRepository<Table> _tableRepo;

        public GenericTableController(ITableRepository<Table> tableRepo)
        {
            _tableRepo = tableRepo;
        }


        [HttpGet]
        [Route("all")]
        public virtual async Task<ActionResult<List<Table>>> GetAll()
        {

            return await  _tableRepo.GetAll();
        }



        [HttpGet]
        [Route("GetById")]
        public virtual async Task<ActionResult<Table>> GetById([FromQuery] Table tableObj)
        {
            return await _tableRepo.GetById(tableObj);
        }


        [Route("getByParam")]
        [HttpPost]
        public async Task<IEnumerable<Table>> GetTables(JToken tableJson)
        {

            //create tableObj like: [FromBody] Table tableObj
            var tableObj = tableJson.ToObject<Table>();

            //create a List of all search properties
            var hashtableJson = tableJson.ToObject<Dictionary<string, dynamic>>();

            var tables = await _tableRepo.GetTables(tableObj, hashtableJson);

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
        public async Task<bool> Delete([FromQuery] Table tableObj)
        {
            
            return await _tableRepo.DeleteTable(tableObj);
        }


        [Route("insert")]
        [HttpPost]
        public virtual async Task<bool> insert(JToken tableJson)
        {
            //create tableObj like: [FromBody] Table tableObj
            var tableObj = tableJson.ToObject<Table>();

            //create a List of all search properties
            var hashtableJson = tableJson.ToObject<Dictionary<string, dynamic>>();



            return await _tableRepo.InsertTable(tableObj, hashtableJson);
        }





        [Route("pupdate")]
        [HttpPatch]
        public async Task<bool> PartialUpdate(JToken tableJson)
        {
            //create tableObj like: [FromBody] Table tableObj
            Table tableObj = tableJson.ToObject<Table>();

            //create a List of all fieldsToChange in the Json
            var fieldsToChange = tableJson.ToObject<Dictionary<string, dynamic>>();

            return await _tableRepo.PartialUpdateTable(tableObj, fieldsToChange);
        }
    }
}