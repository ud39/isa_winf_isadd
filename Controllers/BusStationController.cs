using WinfADD.Models;
using WinfADD.Repositories;

namespace WinfADD.Controllers
{
    public class BusStationController : GenericTableController<BusStation>
    {
        public BusStationController(ITableRepository<BusStation> tableRepo) : base(tableRepo)
        {
        }
    }
}