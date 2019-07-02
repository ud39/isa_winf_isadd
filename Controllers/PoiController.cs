using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WinfADD.Models;
using WinfADD.Repositories;        
using Microsoft.AspNetCore.Authorization;

namespace WinfADD.Controllers
{       

    [AllowAnonymous]
    public class PoiController : GenericTableController<Poi>
    {
        private PoiRepository _PoiRepository;
        
        public PoiController(ITableRepository<Poi> tableRepo) : base(tableRepo)
        {
            _PoiRepository = (PoiRepository)tableRepo;
        }
        
        
        [HttpGet("all")]
        public new async Task<List<Poi>> GetAll()
        {
            return await  _PoiRepository.GetAll();
        }
        
        [HttpGet("GetById")]
        public new async Task<ActionResult<Poi>> GetById([FromQuery] Poi poi)
        {
            return await base.GetById(poi);
        }
        
    }
}