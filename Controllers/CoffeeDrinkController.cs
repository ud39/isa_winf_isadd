using WinfADD.Models;
using WinfADD.Repositories;

namespace WinfADD.Controllers
{
    public class CoffeeDrinkController : GenericTableController<CoffeeDrink>
    {
        public CoffeeDrinkController(ITableRepository<CoffeeDrink> tableRepo) : base(tableRepo)
        {
        }
    }
}