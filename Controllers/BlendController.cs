using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WinfADD.Models;
using WinfADD.Repositories;

namespace WinfADD.Controllers
{
    public class BlendController : GenericTableController<Blend>
    {
        
        private BlendRepository _blendRepository;
        
        public BlendController(ITableRepository<Blend> tableRepo) : base(tableRepo)
        {
            _blendRepository = (BlendRepository)tableRepo;
        }
        
        [HttpGet("allpreview")]
        public async Task<List<BlendPreview>> GetAll()
        {
            return await  _blendRepository.GetAll();
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<BlendPreview>> GetById(string id)
        {
            return await _blendRepository.GetById(id);
        }

    }
}