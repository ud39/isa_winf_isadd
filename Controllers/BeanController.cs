using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WinfADD.Models;
using WinfADD.Repositories;

namespace WinfADD.Controllers
{
    public class BeanController : GenericTableController<Bean>
    {
        private BeanRepository _beanRepository;
        
        public BeanController(ITableRepository<Bean> tableRepo) : base(tableRepo)
        {
            _beanRepository = (BeanRepository)tableRepo;
        }
        
        
        [HttpGet("allpreview")]
        public async Task<List<BeanPreview>> GetAll()
        {
            return await  _beanRepository.GetAll();
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<BeanPreview>> GetById([FromQuery] Bean bean)
        {
            return await _beanRepository.GetById(bean);
        }
        
    }
}