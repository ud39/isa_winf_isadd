using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WinfADD.Models;
using WinfADD.Repositories;     
using Microsoft.AspNetCore.Authorization;

namespace WinfADD.Controllers
{
[AllowAnonymous]
    public class EventController : GenericTableController<Event>
    {
        private EventRepository _eventRepository;
        
        
        public EventController(ITableRepository<Event> eventRepository) : base(eventRepository)
        {
            _eventRepository = (EventRepository)eventRepository;

        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetById(int id)
        {
            return await _eventRepository.GetById(id);
        }
        
        [HttpGet]
        [Route("all")]
        public new async Task<IEnumerable<Event>> GetAll()
        {
            return await  _eventRepository.GetAll();
        }
        
    }
}