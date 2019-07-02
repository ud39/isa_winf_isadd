using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WinfADD.Models;
using WinfADD.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace WinfADD.Controllers
{
    
    public class BeanController : GenericTableController<Bean, BeanPreview>
    {
        private BeanRepository _beanRepository;
        
        public BeanController(ITableRepository<Bean, BeanPreview> tableRepo) : base(tableRepo)
        {
            _beanRepository = (BeanRepository) tableRepo;
        }
        
        [Authorize(Roles = "ADMIN")]
        [ValidateAntiForgeryToken]
        [HttpGet("all")]
        public new async Task<IEnumerable<BeanPreview>> GetAll()
        {
            return await  _beanRepository.GetAll();
        }
        
        [HttpGet("id")]
        public new async Task<ActionResult<BeanPreview>> GetById([FromQuery] Bean bean)
        {
            return await _beanRepository.GetById(bean);
        }
        
    }
}