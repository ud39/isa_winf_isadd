using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WinfADD.Models;
using WinfADD.Repositories;    
using Microsoft.AspNetCore.Authorization;

namespace WinfADD.Controllers
{
[AllowAnonymous]
    public class CoffeeDrinkController : GenericTableController<CoffeeDrink>
    {
        public CoffeeDrinkController(ITableRepository<CoffeeDrink> tableRepo) : base(tableRepo)
        {
        }

        [HttpGet("all")]
        public new async Task<IEnumerable<CoffeeDrink>> GetAll()
        {
            return await  _tableRepo.GetAll();
        }
        
        [HttpGet("GetById")]
        public new async Task<ActionResult<CoffeeDrink>> GetById([FromQuery] CoffeeDrink coffeeDrink)
        {
            return await base.GetById(coffeeDrink);
        }
    }
}