using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using WinfADD.Models;
using WinfADD.Repositories;

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

        [HttpGet]
        [Route("all")]
        public new async Task<IEnumerable<Event>> GetAll()
        {
            return await  _eventRepository.GetAll();
        }
        
        [HttpGet("GetById")]
        public new async Task<ActionResult<Event>> GetById([FromQuery] Event e)
        {
            return await _eventRepository.GetById(e);
        }
        
        [HttpGet("params")]
        public async Task<IEnumerable<Event>> GetEvents([FromQuery] SearchEventModel e)
        {
            return await _eventRepository.GetEvents(e);
        }



        
        
    }
}