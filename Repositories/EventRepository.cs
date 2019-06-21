using System;
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

            //build GetByID sql query
            GetByIdString = "SELECT * FROM" +" " + TableName + " WHERE id = @id";


            //GetAll sql query
            GetAllString = "SELECT * FROM"+ " " + TableName;

        }
        
        [HttpGet("{id}")]
        public virtual async Task<Event> GetById(int id)
        {
            using (IDbConnection conn = Connection)
            {Console.WriteLine("\n GetByID::" + GetByIdString);
                var result = await conn.QueryAsync<Event>(GetByIdString, new {id = id});
                return result.FirstOrDefault();
            }
        }
    }
    
    
}