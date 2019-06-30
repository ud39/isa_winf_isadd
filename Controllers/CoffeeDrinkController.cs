using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WinfADD.Models;
using WinfADD.Repositories;

namespace WinfADD.Controllers
{
    public class CoffeeDrinkController : GenericTableController<CoffeeDrink>
    {
        public CoffeeDrinkController(ITableRepository<CoffeeDrink> tableRepo) : base(tableRepo)
        {
        }

        [HttpGet("all")]
        public async Task<IEnumerable<CoffeeDrink>> GetAll()
        {
            return await  _tableRepo.GetAll();
        }
    }
}