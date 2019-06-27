using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WinfADD.Models;
using WinfADD.Repositories;

namespace WinfADD.Controllers
{
    public class PoiController : GenericTableController<Poi>
    {
        private PoiRepository _PoiRepository;
        
        public PoiController(ITableRepository<Poi> tableRepo) : base(tableRepo)
        {
            _PoiRepository = (PoiRepository)tableRepo;
        }
        
        
        [HttpGet("allpreview")]
        public async Task<List<Poi>> GetAll()
        {
            return await  _PoiRepository.GetAll();
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Poi>> GetById(string id)
        {
            return await _PoiRepository.GetById(id);
        }
    }
}