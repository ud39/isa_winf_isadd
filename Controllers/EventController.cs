using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WinfADD.Models;
using WinfADD.Repositories;

namespace WinfADD.Controllers
{
    public class EventController : GenericTableController<Event>
    {
        private GenericBaseRepository<Event>_eventRepository;
        
        
        public EventController(GenericBaseRepository<Event> eventRepository) : base(eventRepository)
        {
            _eventRepository = eventRepository;
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<CoffeeShop>> GetById(int id)
        {
            return await _eventRepository.GetById(id);
        }
        
    }
}