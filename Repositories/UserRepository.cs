using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using WinfADD.Identity;
using WinfADD.Models;

namespace WinfADD.Repositories
{
    public class UserRepository : GenericBaseRepository<User, UserView>
    {
        public UserRepository(IConfiguration _config) : base(_config)
        {
            this._config = _config;

            Keys.Add("id");

            TableName = "dbo.\"IdentityUser\"";


         //   _MappingM2DB = Models.Mapping.MappingM2DB.BeanMap;
            DefaultTypeMap.MatchNamesWithUnderscores = true;



            //build GetByID sql query
            GetByIdString = "SELECT * FROM " + TableName + " WHERE " + "\"Id\" = @Id";


            //GetAll sql query
           // GetAllString = "SELECT * FROM" + " " + TableName + "INNER JOIN " + TableName +
           //                "_image on name = bean_name " +
            //               "INNER JOIN image_file_name = file_name where content_type = 'preview'";
            GetAllString = "select * from " + TableName;
                
            //Update sql query: UpdateString = "UPDATE table SET property1=@property1, property2=@property2... WHERE key1=@key1, key2=@key2...";


            //Delete sql query
            DeleteString = "DELETE FROM" +" " + TableName + " WHERE \"Id\" = @Id";
        }

        public new async Task<IEnumerable<UserView>> GetAll()
        {
                        
            using (IDbConnection conn = Connection)
            {
                var result = await conn.QueryAsync<UserView>(GetAllString);
            
                return result.ToList();
            }
        }

        public new async Task<UserView> GetById([FromQuery] UserView user)
        {     
            
            Console.WriteLine(DeleteString);
            using (IDbConnection conn = Connection)
            {
                var result = await conn.QueryAsync<UserView>(GetByIdString, user);
            
                return result.FirstOrDefault();
            }
        }


    }
}