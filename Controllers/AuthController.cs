using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WinfADD.Models;
using WinfADD.Identity;
using Microsoft.AspNetCore.Identity;
                                          
using System.Threading.Tasks;
                          

namespace WinfADD.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
           private readonly UserManager<User> _userManager;
           private readonly SignInManager<User> _signInManager;
    
         public AuthController(UserManager<User> userManager,SignInManager<User> signInManager)
         {
             _userManager = userManager;
             _signInManager = signInManager;
         }

        // GET api/values
        [HttpPost, Route("login")]
        public async Task<IActionResult> Login([FromBody]LoginModel user)
        {
            if (user == null)
            {
                return BadRequest("Invalid client request");
            }
            
            if (ModelState.IsValid)
            {
             
               var result = await _signInManager.PasswordSignInAsync(user.Email, user.Password, false, lockoutOnFailure: false);
                                 
              
              if (result.Succeeded){         
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
                                 return Ok(new { Token = tokenString });
              }

            }
            return Unauthorized();
        }
    }
}