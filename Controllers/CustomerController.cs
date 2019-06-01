using Microsoft.AspNetCore.Mvc; 
using System.Collections.Generic; 
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using WinfADD.Models;
using WinfADD.Persistence;
using WinfADD.Repository;
using Newtonsoft.Json;

namespace WinfADD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : Controller
    {
        private readonly CustomerRepository customerRepository;
 
        public CustomerController(IConfiguration configuration)
        {
            customerRepository = new CustomerRepository(configuration);
        }
        
        
        [HttpGet("{id}")]
        public IActionResult GetCustomer(int id)
        {
            var result =  customerRepository.GetCustomer(id);
            //return Content( result.ToList().ToString(), "application/json" );
            return Content(JsonConvert.SerializeObject(result));
        }
        
        [HttpGet]
        public async Task<IEnumerable<Customer>> GetCustomers([FromQuery]CustomerSearchModel customerSeach)
        {
            var customers = await customerRepository.GetCustomers(customerSeach);

            return customers;
        }


        
        // POST: Customer/Create
        [HttpPost]
        public IActionResult Create(Customer cust)
        {
            if (ModelState.IsValid)
            {
                customerRepository.Add(cust);
              //  return RedirectToAction("Index");
            }
       //     return View(cust);
       return null;
        }
 
 
        // POST: /Customer/Edit   
        [HttpPost]
        public IActionResult Edit(Customer obj)
        {

            if (ModelState.IsValid)
            {
                customerRepository.Update(obj);
           //     return RedirectToAction("Index");
            }

            // return View(obj);
            return null;
        }

    }
}