using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WinfADD.Models;
using WinfADD.Repositories;

namespace WinfADD.Controllers
{
    public class CoffeeShopController : GenericTableController<CoffeeShop>
    {
        private ITableRepository<CoffeeShop> _coffeeShopRepo;

        public CoffeeShopController(ITableRepository<CoffeeShop> coffeeShopRepo): base(coffeeShopRepo)
        {
            _coffeeShopRepo = coffeeShopRepo;
        }
        
        
        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<List<CoffeeShop>>> GetAll()
        {
            return await  _coffeeShopRepo.GetAll();
        }

        [HttpGet]
        [Route("GetById")]
        public override async Task<ActionResult<CoffeeShop>> GetById([FromQuery] CoffeeShop tableObj)
        {
            return await _coffeeShopRepo.GetByID(tableObj);
        }
    }
}