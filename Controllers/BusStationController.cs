using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WinfADD.Models;
using WinfADD.Repositories;

namespace WinfADD.Controllers
{
    public class BusStationController : GenericTableController<BusStation>
    {
        public BusStationController(ITableRepository<BusStation> tableRepo) : base(tableRepo)
        {
        }

        [HttpGet("all")]
        public async Task<IEnumerable<BusStation>> GetAll()
        {
            return await  _tableRepo.GetAll();
        }
    }
}