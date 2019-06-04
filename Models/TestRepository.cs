using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Dapper;
using Dapper.Contrib.Extensions;
using Npgsql;

namespace WinfADD.Models
{
    public class TestRepository : ITestRepository {


    private readonly IConfiguration _config;


    public TestRepository(IConfiguration _config)
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


        public async Task<Test> GetByID(string KeyString)
        {

            using (IDbConnection conn = Connection)
            {
               // string sQuery = "SELECT ID, Name, Random FROM Dummies public.Dummies WHERE ID = @ID";
               var result = await conn.QueryAsync<Test>("SELECT * FROM test WHERE keyString = @KeyString", new { KeyString = KeyString });
                return result.FirstOrDefault();
            }
        }

        public  async Task<List<Test>> GetAll()
        {
            using (IDbConnection conn = Connection)
            {
                string sQuery = "SELECT * FROM test";

                var result = await conn.QueryAsync<Test>(sQuery, new Test());
                return result.ToList();
            }
        }


        public async Task<bool> UpdateTest(Test testObj)
        {
            using (IDbConnection conn = Connection)
            {
                Console.Write("\n Will update !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                //var rowsAffected = await conn.UpdateAsync(testObj);
                int rowsAffected = conn.Execute("UPDATE test SET keystring = @KeyString, id = @Id, name = @Name, random = @Random WHERE keystring = @" + testObj.KeyString, testObj);

                if(rowsAffected > 0) Console.Write("\n -------------------------------true");
                Console.WriteLine("---------------------------------false");
                    //connection.Update(new Invoice { InvoiceID = 1, Code = "Update_Single_1"});

                return  true;
            }
        }

        public async Task<bool> DeleteTest(string KeyString)
        {
            using (IDbConnection conn = Connection)
            {
                var rowsAffected = await conn.ExecuteAsync("DELETE FROM test WHERE keystring = @KeyString",new{ KeyString = KeyString });
                Console.Write("\n \n \n -------------------- AffectedROWS: " + rowsAffected);
                if (rowsAffected > 0) return true;
                Console.Write("\n rows____________________ " + rowsAffected);

                return false;

            }
        }

        public bool InsertTest(Test testObj)
        {
            using (IDbConnection conn = Connection)
            {


                Console.Write("++++++++++++++++++++++++++++++++++++++++++++++++++");
                Console.Write("KS: " + testObj.KeyString);
                Console.Write("Id: " + testObj.Id);
                Console.Write("Name: " + testObj.Name);
                Console.Write("Random: " + testObj.Random);


                int rowsAffected = conn.Execute("INSERT INTO test (keystring,id,name,random) values (@KeyString, @Id, @Name, @Random)",
                    new {KeyString = testObj.KeyString, Id = testObj.Id, Name = testObj.Name, Random = testObj.Random});



                Console.Write("\n \n \n -------------------- AffectedROWS: " + rowsAffected);
                if (rowsAffected > 0) return true;
                return false;


            }

        }


    }
}