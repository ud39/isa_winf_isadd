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
        private ICoffeeShopRepository _coffeeShopRepo;

        public CoffeeShopController(ICoffeeShopRepository coffeeShopRepo): base(coffeeShopRepo)
        {
            _coffeeShopRepo = coffeeShopRepo;
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
    }
}