using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WinfADD.Models;
using WinfADD.Repositories;  
using Microsoft.AspNetCore.Authorization;

namespace WinfADD.Controllers
{
[AllowAnonymous]
    public class BusStationController : GenericTableController<BusStation>
    {
        public BusStationController(ITableRepository<BusStation> tableRepo) : base(tableRepo)
        {
        }

        [HttpGet("all")]
        public new async Task<IEnumerable<BusStation>> GetAll()
        {
            return await  _tableRepo.GetAll();
        }
    }
}