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
        private CoffeeShopRepository _coffeeShopRepo;

        public CoffeeShopController(ITableRepository<CoffeeShop> coffeeShopRepo) : base(coffeeShopRepo)
        {
            _coffeeShopRepo = (CoffeeShopRepository)coffeeShopRepo;
        }

        
        
        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<List<CoffeeShopPreview>>> GetAll()
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