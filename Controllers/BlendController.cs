using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WinfADD.Models;
using WinfADD.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace WinfADD.Controllers
{
    [AllowAnonymous]
    public class BlendController : GenericTableController<Blend, BlendPreview>
    {
        
        private BlendRepository _blendRepository;
        
        public BlendController(ITableRepository<Blend, BlendPreview> tableRepo) : base(tableRepo)
        {
            _blendRepository = (BlendRepository)tableRepo;
        }
        
        [HttpGet("all")]
        public async Task<IEnumerable<BlendPreview>> GetAll()
        {
            return await  _blendRepository.GetAll();
        }
        
        [HttpGet("id")]
        public async Task<ActionResult<BlendPreview>> GetById([FromQuery] Blend blend)
        {
            return await _blendRepository.GetById(blend);
        }

    }
}