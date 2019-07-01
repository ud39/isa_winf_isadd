using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WinfADD.Models;
using Microsoft.AspNetCore.Identity;
                                          
using System.Threading.Tasks;
using AspNetCore.Identity.Dapper;
using Microsoft.AspNetCore.Authorization;
using WinfADD.Identity;


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
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody]LoginViewModel user)
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
        
        
        [HttpPost, Route("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new User { UserName = model.Email, Email = model.Email};
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    await _signInManager.SignInAsync(user, isPersistent: false);
                    return Ok();
                }
               
            }

            return BadRequest();
        }

        [Authorize]
        [HttpGet, Route("test")]
        public JsonResult Test()
        {

            return Json("TEST");
        }
        
    }
}