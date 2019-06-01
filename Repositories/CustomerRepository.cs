using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Dapper;
using System.Data;
using System.Data.Common;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Npgsql;
using WinfADD.Models;

namespace WinfADD.Repository
{
    public class CustomerRepository
    {
        private string connectionString;

        public CustomerRepository(IConfiguration configuration)
        {
            connectionString = "Host=localhost;Port=5432;Username=postgres;Password=postgres;Database=postgres;";

            //connectionString = "Host=db;Port=5432;Username=postgres;Password=postgres;Database=postgres;";
        }

        internal IDbConnection Connection
        {
            get { return new NpgsqlConnection(connectionString); }
        }

        public void Add(Customer item)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                dbConnection.Execute(
                    "INSERT INTO customer (name,phone,email,address) VALUES(@Name,@Phone,@Email,@Address)", item);
            }

        }

        public IEnumerable<Customer> FindAll()
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<Customer>("SELECT * FROM customer");
            }
        }

        public Customer GetCustomer(int id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<Customer>("SELECT * FROM customer WHERE id = @Id", new {Id = id})
                    .FirstOrDefault();
            }
        }

        public async Task<IEnumerable<Customer>> GetCustomers(CustomerSearchModel customerSearch)
        {
            /*
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<Customer>("SELECT * FROM customer WHERE Name = @NAME ", new {Name = customerSearch.Name});
            }
            */
            
            //TODO: Handling optional parameters
            var sql = "SELECT * FROM customer WHERE Name = @NAME AND @EMAIL = Email";

            var paramenter = new DynamicParameters();
            paramenter.Add("@NAME", customerSearch.Name);
            paramenter.Add("@EMAIL", customerSearch.Email);
            using (IDbConnection dbConnection = Connection)
            {
                return dbConnection.Query<Customer>(sql,paramenter);
            }

        }

        public void Remove(int id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                dbConnection.Execute("DELETE FROM customer WHERE Id=@Id", new {Id = id});
            }
        }

        public void Update(Customer item)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                dbConnection.Query(
                    "UPDATE customer SET name = @Name,  phone  = @Phone, email= @Email, address= @Address WHERE id = @Id",
                    item);
            }
        }
    }
}