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
    public class BlendControllerDUMMY : Controller
    {

        private readonly ITableRepository<Blend> _blendRepo;

        public BlendControllerDUMMY(ITableRepository<Blend> blendRepo)
        {
            _blendRepo = blendRepo;
        }


        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<List<Blend>>> GetAll(Blend blendObj)
        {
            return await  _blendRepo.GetAll();
        }

        [HttpGet]
        [Route("GetById")]
        public async Task<ActionResult<Blend>> GetByID([FromBody] Blend blendObj)
        {
            return await _blendRepo.GetByID(blendObj);
        }


        [Route("getByParam")]
        [HttpGet]
        public async Task<IEnumerable<Blend>> GetBlends(JToken testJson)
        {

            //create testObj like: [FromBody] Test testObj
            var blendObj = testJson.ToObject<Blend>();

            //create a List of all search properties
            var hashtableJson = testJson.ToObject<Dictionary<string, string>>();
            //TODO var counter = 0;

            var blends = await _blendRepo.GetTables(blendObj, hashtableJson);

            return blends;
        }


        //TODO maybe handle chaning natural key-> new insert+delete
        [Route("update")]
        [HttpPut]
        public async Task<bool> Update([FromBody] Blend blendObj)
        {
            return await _blendRepo.UpdateTable(blendObj);
        }



        [Route("delete")]
        [HttpDelete]
        public async Task<bool> Delete([FromBody] Blend blendObj)
        {
            return await _blendRepo.DeleteTable(blendObj);
        }


        [Route("add")]
        [HttpPost]
        public async Task<bool> Post(JToken blendJson)
        {
            //create testObj like: [FromBody] Test testObj
            var blendObj = blendJson.ToObject<Blend>();

            //create a List of all search properties
            var hashtableJson = blendJson.ToObject<Dictionary<string, string>>();



            return await _blendRepo.InsertTable(blendObj, hashtableJson);
        }





        //TODO pUpdate //TODO WHERE key? || others?
        [Route("pupdate")]
        [HttpPatch]
        public async Task<bool> PartialUpdate(JToken testJson)
        {
            //create testObj like: [FromBody] Test testObj
            Blend blendObj = testJson.ToObject<Blend>();

            //create a List of all keys in the Json
            var keys = testJson.ToObject<Dictionary<string, string>>();

            return await _blendRepo.PartialUpdateTable(blendObj, keys);
        }






    }
}