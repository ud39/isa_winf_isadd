using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WinfADD.Models;
using WinfADD.Repositories;
using WinfADD.Identity;

namespace WinfADD.Controllers
{
    
    public class UserController : GenericTableController<User, UserView>
    {
        private UserRepository _userRepository;
        
        public UserController(ITableRepository<User, UserView> tableRepo) : base(tableRepo)
        {
            _userRepository = (UserRepository) tableRepo;
        }
        

        [HttpGet("all")]
        public new async Task<IEnumerable<UserView>> GetAll()
        {
            return await  _userRepository.GetAll();
        }

 
    }
}