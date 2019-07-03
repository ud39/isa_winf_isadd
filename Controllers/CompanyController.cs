using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WinfADD.Models;
using WinfADD.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace WinfADD.Controllers
{
    [AllowAnonymous]
    public class CompanyController : GenericTableController<Company>
    {
        private CompanyRepository _CompanyRepository;
        
        public CompanyController(ITableRepository<Company> tableRepo) : base(tableRepo)
        {
            _CompanyRepository = (CompanyRepository) tableRepo;
        }
        
        [HttpGet("all")]
        public new async Task<IEnumerable<Company>> GetAll()
        {
            return await  _CompanyRepository.GetAll();
        }
        
        [HttpGet("GetById")]
        public new async Task<ActionResult<Company>> GetById([FromQuery] Company Company)
        {
            return await _CompanyRepository.GetById(Company);
        }
        
    }
}