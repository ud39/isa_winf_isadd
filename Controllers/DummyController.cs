using Microsoft.AspNetCore.Mvc; 
using System.Collections.Generic; 
using System.Linq;
using System.Threading.Tasks;
using WinfADD.Models;
using WinfADD.Persistence;

namespace WinfADD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DummyController : Controller
    {


        private readonly IDummyRepository _dummyRepo;

        public DummyController(IDummyRepository dummyRepo)
        {
            _dummyRepo = dummyRepo;
        }


        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<List<Dummy>>> GetAll()
        {
            return await  _dummyRepo.GetAll();
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Dummy>> GetByID(long id)
        {
            return await _dummyRepo.GetByID(id);
        }

       [HttpGet]
       [Route("add/{id}")]
       public async Task<Dummy> AddDummy(long id)
        {
            return await _dummyRepo.AddDummy(id);
        }
    }
}