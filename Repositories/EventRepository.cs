using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using WinfADD.Models;

namespace WinfADD.Repositories
{
    public class EventRepository : GenericBaseRepository<Event>
    
    {
        public EventRepository(IConfiguration _config) : base(_config)
        {
            this._config = _config;

            TableName = "event";

            GetByIdString =
                "select e .*, i.file_name from event_image ei, image i, event e where e.id = ei.event_id and e.id = @id and ei.image_file_name = i.file_name and content_type = 'preview'; " +
                "select i.* from event_image ei, image i, event e where e.id = ei.event_id and e.id = @id and ei.image_file_name = i.file_name and i.content_type != 'preview'";


            GetAllString = "select distinct e.*, i.* from event_image ei, image i, event e where e.id = ei.event_id and e.id = 1 and ei.image_file_name = i.file_name";

        }
        
        [HttpGet("{id}")]
        public virtual async Task<Event> GetById(int id)
        {
            using (IDbConnection conn = Connection)
            {
                
                var queryResult = await conn.QueryMultipleAsync(GetByIdString, new {id = id});
                
                var result = queryResult.Read<Event>().FirstOrDefault();
                
                if(result != null)
                 result.Images = queryResult.Read<Image>().ToList();
                
                return result;
            }
        }
        
        
        public async Task<List<Event>> GetAll()
        {
            
            using (IDbConnection conn = Connection)
            {
                var result = await conn.QueryAsync<Event>(GetAllString);

                return result.ToList();
            }


        }

    }
    
    
}