using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Dapper;
using Npgsql;

namespace WinfADD.Models
{
    public class DummyRepository : IDummyRepository {


    private readonly IConfiguration _config;


    public DummyRepository(IConfiguration _config)
    {
        this._config = _config;
    }

    public IDbConnection Connection
    {
        get
        {
            return new NpgsqlConnection(_config["ConnectionStrings:DefaultConnection"]);
        }
    }


        public async Task<Dummy> GetByID(long id)
        {

            using (IDbConnection conn = Connection)
            {
               // string sQuery = "SELECT ID, Name, Random FROM Dummies public.Dummies WHERE ID = @ID";
               var result =  conn.Query<Dummy>("SELECT * FROM \"Dummies\" WHERE \"Id\" = @ID", new { Id = id });
                return result.FirstOrDefault();
            }
        }

        public  async Task<List<Dummy>> GetAll()
        {
            using (IDbConnection conn = Connection)
            {
                string sQuery = "SELECT * FROM \"Dummies\"";

                var result = await conn.QueryAsync<Dummy>(sQuery, new Dummy());
                return result.ToList();
            }
        }

        public async Task<Dummy> AddDummy(long id)
        {
            using (IDbConnection conn = Connection)
            {
                var d = new Dummy()
                {
                    Id = id,
                    Name = "Test_Name",
                    Random = "random text"
                };
                string aQuery = "INSERT INTO \"Dummies\" (\"Id\", \"Name\", \"Random\" FROM Employee) VALUES (@Id, \"namestring\", \"randomstring\")";

                var result = conn.ExecuteAsync(aQuery,
                 new Dummy()
                {
                    Id = id,
                    Name = "Test_Name",
                    Random = "random text"
                });
                return d;


            }

        }


    }
}