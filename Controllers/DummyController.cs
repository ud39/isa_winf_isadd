using Microsoft.AspNetCore.Mvc; 
using System.Collections.Generic; 
using System.Linq;
using WinfADD.Models;
using WinfADD.Persistence;

namespace WinfADD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DummyController : Controller
    {
        private readonly WinfAddContext _context;

        public DummyController(WinfAddContext context)
        {
            _context = context;
            if (_context.Dummies.Any())
            {
                _context.Dummies.Add(new Dummy {Name = "Item1"});
                _context.SaveChanges();
            }
        }


        [HttpGet]
        public ActionResult<List<Dummy>> GetAll()
        {
            return _context.Dummies.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Dummy> GetById(long id)
        {
            var item = _context.Dummies.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            return item;
        }
    }
}