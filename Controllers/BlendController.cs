using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WinfADD.Models;
using WinfADD.Repositories;

namespace WinfADD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlendController : Controller
    {

        private readonly ITableRepository<Blend> _blendRepo;

        public BlendController(ITableRepository<Blend> blendRepo)
        {
            _blendRepo = blendRepo;
        }


        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<List<Blend>>> GetAll(Blend blendObj)
        {
            return await  _blendRepo.GetAll(new Blend());
        }

        [HttpGet]
        [Route("GetById")]
        public async Task<ActionResult<Blend>> GetByID([FromBody] Blend blendObj)
        {
            return await _blendRepo.GetByID(blendObj);
        }


        //TODO maybe handle chaning natural key-> new insert+delete
        [Route("update")]
        [HttpPut]
        public async Task<bool> Update([FromBody] Blend blendObj)
        {
            return await _blendRepo.UpdateTable(blendObj);
        }



    }
}