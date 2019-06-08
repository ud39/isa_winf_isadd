using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Dapper;
using Npgsql;

namespace WinfADD.Models
{
    public class TestRepository : ITestRepository {


    //key fields
    private List<string> keys = new List<string>();


    private readonly IConfiguration _config;


    public TestRepository(IConfiguration _config)
    {
        this._config = _config;

        //TODO add all key names here
        keys.Add("KeyString");

    }

    private IDbConnection Connection => new NpgsqlConnection(_config["ConnectionStrings:DefaultConnection"]);


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

                var rowsAffected =  await conn.ExecuteAsync(
                    "UPDATE test SET id = @Id, name = @Name WHERE keystring = @KeyString",
                    testObj);

                return rowsAffected > 0;
            }
        }


        //partial update
        public async Task<bool> PartialUpdateTest(Test testObj, IDictionary<string, string> fieldsToChange)
        {
            using (IDbConnection conn = Connection)
            {
                var fieldCounter = 0;
                var sqlQuery = "UPDATE test SET ";

                PropertyInfo[] possibleProperties = typeof(Test).GetProperties();
                foreach (PropertyInfo property in possibleProperties)
                {

                   var propertyName = property.Name.ToLower();

                   if (!fieldsToChange.ContainsKey(propertyName) || keys.Contains(propertyName)) continue;
                    sqlQuery += propertyName + " = @" + propertyName + ",";
                    fieldCounter++;
                }

                if (fieldCounter < 1) return false;

                //remove last ','
                sqlQuery = sqlQuery.Remove(sqlQuery.Length - 1);



                //WHERE (matching keys)
                sqlQuery += " WHERE";
                foreach (var key in keys)
                {
                    sqlQuery += "  " + key + " = @" + key + " ,";
                }

                //remove last ','
                sqlQuery = sqlQuery.Remove(sqlQuery.Length - 1);

                var rowsAffected = await conn.ExecuteAsync(sqlQuery, testObj);

                return rowsAffected > 0;
            }
        }


        public async Task<bool> DeleteTest(string KeyString)
        {
            using (IDbConnection conn = Connection)
            {
                var rowsAffected = await conn.ExecuteAsync("DELETE FROM test WHERE keystring = @KeyString",new{ KeyString = KeyString });
                return (rowsAffected > 0);
            }
        }

        public async Task<bool> InsertTest(Test testObj)
        {
            using (IDbConnection conn = Connection)
            {
                var rowsAffected = await conn.ExecuteAsync("INSERT INTO test (keystring,id,name,random) values (@KeyString, @Id, @Name, @Random)",
                    testObj);

                return rowsAffected > 0;
            }

        }


        public async Task<IEnumerable<Test>> GetTests(Test testObj, IDictionary<string, string> searchProperties)
        {

            var possibleProperties = typeof(Test).GetProperties();
            var builder = new SqlBuilder();

            var filterTest= builder.AddTemplate("Select * from test /**where**/ ");

            foreach (var property in possibleProperties)
            {
                var properties = new Dictionary<string, object>();
                var propertyName = property.Name.ToLower();
                if (!searchProperties.ContainsKey(propertyName)) continue;
                properties.Add(propertyName, property.GetValue(testObj));
                builder.Where(propertyName + " = " + "@" + propertyName, properties);
            }

            using (IDbConnection dbConnection = Connection)
            {
                if (possibleProperties.Length == 0)
                {
                       return await GetAll();
                }

                return await dbConnection.QueryAsync<Test>(filterTest.RawSql,filterTest.Parameters);
            }

        }




    }
}