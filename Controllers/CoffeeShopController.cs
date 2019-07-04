using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using WinfADD.Models;
using WinfADD.Repositories;    
using Microsoft.AspNetCore.Authorization;

namespace WinfADD.Controllers
{
    [AllowAnonymous]
    public class CoffeeShopController : GenericTableController<CoffeeShop, CoffeeShopPreview>
    {
        private CoffeeShopRepository _coffeeShopRepo;

        public CoffeeShopController(ITableRepository<CoffeeShop, CoffeeShopPreview> coffeeShopRepo) : base(coffeeShopRepo)
        {
            _coffeeShopRepo = (CoffeeShopRepository)coffeeShopRepo;
        }


        [HttpGet("params")]
        public async Task<IEnumerable<CoffeeShopPreview>> GetCoffeeShops([FromQuery]CoffeeShopSearchModel searchQuery)
        {
            var coffeeShops = await _coffeeShopRepo.GetCoffeeShops(searchQuery);

            return coffeeShops;
        }
        
        
        [HttpGet("supplies")]
        public async Task<IEnumerable<CoffeeShopPreview>> GetSupplyShops([FromQuery]SearchSupplyShopModel searchQuery)
        {
            var coffeeShops = await _coffeeShopRepo.GetSupplyShops(searchQuery);

            return coffeeShops;
        }
        
        
      //  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
          [HttpGet("GetById")]
          public new async Task<ActionResult<CoffeeShop>> GetById([FromQuery] CoffeeShop c)
          {
              return await _coffeeShopRepo.GetById(c);
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


        [HttpPatch("update")]
        public async Task<bool> editCoffeeShop(JToken jToken)
        {

            Console.WriteLine("------------------------------------------->");
            var coffeeShopObj = jToken.ToObject<CoffeeShopUpdateModel>();

            Console.WriteLine("############################");
            Console.WriteLine("::"+coffeeShopObj.EquipmentCategoriesInsert);
            Console.WriteLine(":empty?:"+coffeeShopObj.EquipmentCategoriesInsert.Length);
            Console.WriteLine(":empty?:"+coffeeShopObj.EquipmentCategoriesDelete.Length);




            var jObj = jToken.ToObject<JObject>();
            IDictionary<string, dynamic> fieldsToChange = new Dictionary<string, dynamic>();
            foreach (var (propertyName, value) in jObj)
            {
                fieldsToChange.Add(propertyName, value);
                Console.WriteLine(propertyName+"<-->"+value);
            }
            // foreach (var pair in jObj) {propertyValues.Add(pair.Key, pair.Value);}


            return await _coffeeShopRepo.PartialUpdateCoffeeShop(coffeeShopObj ,fieldsToChange);
        }

        [HttpGet ("all")]
        public new async Task<IEnumerable<CoffeeShopPreview>> GetAll()
        {

            return await  _coffeeShopRepo.GetAll();
        }

        [HttpGet ("supplies/all")]
        public new async Task<IEnumerable<CoffeeShopPreview>> GetAllSupplies()
        {

            return await  _coffeeShopRepo.GetAllSupply();
        }

    }
}