using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using WinfADD.Models;
using WinfADD.Repositories;

namespace WinfADD.Controllers
{
    public class CoffeeShopController : GenericTableController<CoffeeShop>
    {
        private CoffeeShopRepository _coffeeShopRepo;

        public CoffeeShopController(ITableRepository<CoffeeShop> coffeeShopRepo) : base(coffeeShopRepo)
        {
            _coffeeShopRepo = (CoffeeShopRepository)coffeeShopRepo;
        }



        [HttpGet("allpreview")]
        public async Task<ActionResult<List<CoffeeShopPreview>>> GetAll()
        {
            return await  _coffeeShopRepo.GetAll();
        }

        [HttpGet("params")]
        public async Task<IEnumerable<CoffeeShopPreview>> GetCoffeeShops([FromQuery]CoffeeShopSearchModel customerSearch)
        {
            var coffeeShops = await _coffeeShopRepo.GetCoffeeShops(customerSearch);

            return coffeeShops;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<CoffeeShop>> GetById(int id)
        {
            return await _coffeeShopRepo.GetById(id);
        }


        [HttpPost("insert")]
        public override async Task<bool> insert(JToken jToken)
        {

            var coffeeShopObj = jToken.ToObject<CoffeeShop>();
            var jObj = jToken.ToObject<JObject>();
            IDictionary<string, dynamic> propertyValues = new Dictionary<string, dynamic>();
            foreach (var (propertyName, value) in jObj) {propertyValues.Add(propertyName, value);}
            // foreach (var pair in jObj) {propertyValues.Add(pair.Key, pair.Value);}


            return await _coffeeShopRepo.InsertTable(coffeeShopObj, propertyValues);
        }


        [HttpGet("update")]
        public async Task<bool> editCoffeeShop(JToken jToken)
        {

            var coffeeShopObj = jToken.ToObject<CoffeeShop>();
            var jObj = jToken.ToObject<JObject>();
            IDictionary<string, dynamic> fieldsToChange = new Dictionary<string, dynamic>();
            foreach (var (propertyName, value) in jObj) {fieldsToChange.Add(propertyName, value);}
            // foreach (var pair in jObj) {propertyValues.Add(pair.Key, pair.Value);}


            return await _coffeeShopRepo.PartialUpdateTable(coffeeShopObj ,fieldsToChange);
        }



    }
}