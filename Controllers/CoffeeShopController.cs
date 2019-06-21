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

        
        
        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<List<CoffeeShop>>> GetAll()
        {
            return await  _coffeeShopRepo.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CoffeeShop>> GetById(int id)
        {
            return await _coffeeShopRepo.GetById(id);
        }


        [HttpPost("insert")]
        public async Task<bool> insertCoffeeShop(JToken jToken)
        {

            var jObj = jToken.ToObject<JObject>();
            IDictionary<string, dynamic> propertyValues = new Dictionary<string, dynamic>();
            foreach (var pair in jObj) {propertyValues.Add(pair.Key, pair.Value);}

            Console.WriteLine("<||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||>");
            foreach (var p in propertyValues)
            {
                Console.WriteLine(p.Key+"-->"+p.Value);
            }



            return _coffeeShopRepo.InsertCoffeeShop(propertyValues);
        }



    }
}