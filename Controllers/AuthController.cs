using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WinfADD.Models;
using System.Threading.Tasks;
using Identity.Dapper.Entities;
using Identity.Dapper.Stores;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using WinfADD.Identity;



namespace WinfADD.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
           private readonly UserManager<User> _userManager;
           private readonly SignInManager<User> _signInManager;
           private readonly RoleManager<UserRole> _roleManager;
           private readonly DapperUserStore<User, int, DapperIdentityUserRole<int>, DapperIdentityRoleClaim<int>, DapperIdentityUserClaim<int>, DapperIdentityUserLogin<int>, UserRole> _dapperStore;
           private readonly IConfiguration _configuration;

         public AuthController(IUserStore<User> dapperStore, UserManager<User> userManager, SignInManager<User> signInManager, RoleManager<UserRole> roleManager, IConfiguration configuration)
         {
             _userManager = userManager;
             _dapperStore = dapperStore as DapperUserStore<User, int, DapperIdentityUserRole<int>, DapperIdentityRoleClaim<int>, DapperIdentityUserClaim<int>, DapperIdentityUserLogin<int>, UserRole>;
             _configuration = configuration;
             _roleManager = roleManager;
             _signInManager = signInManager;
             init();
         }

         private async Task init()
         {

         
             
             // var result = await _userManager.FindByEmailAsync("admin@.com");
            // if (result == null)
            {
                //   var admin = new User {UserName = "admin@.com", Email = "admin@.com"};
                //var manager = new User {UserName = "manager@.com", Email = "manager@.com"};
                //var user = new User {UserName = "manager@.com", Email = "manager@.com"};

                // var admin = await _userManager.CreateAsync(new User {UserName = "admin@.com", Email = "admin@.com"}, "admin123");
                // var manager = await _userManager.CreateAsync( new User {UserName = "manager@.com", Email = "manager@.com"}, "manager123");
                //var user = await  _userManager.CreateAsync(new User {UserName = "manager@.com", Email = "manager@.com"}, "user123");
                //await _userManager.AddToRoleAsync(admin, "ADMIN");
                //await _userManager.AddToRoleAsync(admin, "contentmanager");
                //await _userManager.AddToRoleAsync(admin, "user");
                //  await _userManager.AddToRoleAsync(manager, "contentmanager");
                //  await _userManager.AddToRoleAsync(manager, "user");
                // await _userManager.AddToRoleAsync(user, "user");

                /*       
               string[] roleNames = { "admin", "manager", "user" };
               IdentityResult roleResult;

               //creating a super user who could maintain the web app
               var poweruser = new User
               {
                   UserName = "Test7@com",
                   Email = "Test7@com"
               };
               string UserPassword = "Test123";
               var user = await _userManager.FindByEmailAsync("Test7@com");
               if(user == null)
               {
                   var createPowerUser = await _userManager.CreateAsync(poweruser, UserPassword);
                   if (createPowerUser.Succeeded)
                   {
                   
                     //  if(_dapperStore.)
                       //here we tie the new user to the "Admin" role 
                       await _dapperStore.AddToRoleAsync(poweruser, "ADMIN", CancellationToken.None);
                   }
               }
               await _dapperStore.AddToRoleAsync(poweruser, "ADMIN", CancellationToken.None);
            }*/
            }
         }

         // GET api/values
         [HttpPost, Route("login")]
         [AllowAnonymous]
         public async Task<object> Login([FromBody] LoginViewModel user)
         {
             if (user == null)
             {
                 return BadRequest("Invalid client request");
             }

             if (ModelState.IsValid)
             {
                 var u = await _userManager.FindByEmailAsync(user.Email);
                 if (u != null)
                 {
                     var result = await _userManager.CheckPasswordAsync(u,user.Password);


                     if (result)
                     {
                         /*
                         var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                         var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                         var tokeOptions = new JwtSecurityToken(
                             issuer: "http://localhost:5001",
                             audience: "http://localhost:5001",
                             claims: new List<Claim>(),
                             expires: DateTime.Now.AddMinutes(5),
                             signingCredentials: signinCredentials
                         );

                         var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                         return Ok(new {Token = tokenString});
                         */ 
                         return await GenerateJwtToken(user.Email, u);
                     }

                 }
             }
             return Unauthorized();
         }


         [HttpPost, Route("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel model)
        {
            if (null == await _userManager.FindByEmailAsync("admin@.com"))
            {
                var u = new User {UserName = "admin@.com", Email = "admin@.com"};
                await _userManager.CreateAsync(u, "admin123");
                var result = await _userManager.AddToRoleAsync(u, "admin");

            }
            
            if (ModelState.IsValid)
            {
                var user = new User { UserName = model.Email, Email = model.Email};
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    
                    //await _signInManager.SignInAsync(user, isPersistent: false);
                    return Ok();
                }
               
            }

            return BadRequest();
        }

        [Authorize(Roles = "admin")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet, Route("testadmin")]
        public JsonResult Test()
        {

            return Json("TEST ERFOLGREICH: ADMIN");
        }

        [Authorize(Policy = "HasUserRights")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet, Route("testuser")]
        public JsonResult Test1()
        {

            return Json("TEST ERFOLGREICH: USER");
        }

        
        private async Task<object> GenerateJwtToken(string email, User user)
        {
            var userRoles = await _userManager.GetRolesAsync(user);
            
            
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                //new Claim(ClaimTypes.NameIdentifier, user.Id)        
            };

            foreach(var role in userRoles){
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpireMinutes"]));

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Issuer"],
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }



}