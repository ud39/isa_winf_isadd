using WinfADD.Models;
using WinfADD.Repositories;

namespace WinfADD.Controllers
{
    public class CoffeeShopController : GenericTableController<CoffeeShop>
    {
        public CoffeeShopController(ITableRepository<CoffeeShop> tableRepo) : base(tableRepo)
        {
        }
    }
}