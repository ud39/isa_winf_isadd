using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using WinfADD.Models;
using WinfADD.Models.Mapping;

namespace WinfADD.Repositories
{
    public class CompanyRepository : GenericBaseRepository<Company>
    {
        public CompanyRepository(IConfiguration _config) : base(_config)
        {
            this._config = _config;

            TableName = "Company";

            DefaultTypeMap.MatchNamesWithUnderscores = true;

            var keyCompare = "name" + " = @" + "name";

            _MappingM2DB = MappingM2DB.CompanyMap;

            GetByIdString = "select * from company where "+ keyCompare;

            GetAllString = "select * from company";

            UpdateString = "UPDATE " + TableName + " SET ";
            
            UpdateString += " WHERE " + keyCompare;

            DeleteString = "DELETE FROM" +" " + TableName + " WHERE " + keyCompare;
        }

    }
}