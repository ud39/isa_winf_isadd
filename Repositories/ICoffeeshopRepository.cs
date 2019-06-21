using System.Collections.Generic;
using System.Threading.Tasks;
using WinfADD.Models;

namespace WinfADD.Repositories
{
    public interface ICoffeeShopRepository : ITableRepository<CoffeeShop>
    {
        
        Task<CoffeeShop> GetById(int id);

        bool InsertCoffeShop(CoffeeShop coffeeShopObj, IDictionary<string, dynamic> propertyValues);
    }
}