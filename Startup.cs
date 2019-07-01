using System.Text;
using AspNetCore.Identity.Dapper;
using Dapper;
using Identity.Dapper;
using Identity.Dapper.Models;
using Identity.Dapper.PostgreSQL.Connections;
using Identity.Dapper.PostgreSQL.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using WinfADD.Models.Mapping;
using WinfADD.Repositories;
using WinfADD.Identity;
using WinfADD.Models;

namespace WinfADD
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
            
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            


            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/dist"; });
            
           
           var connectionString = Configuration.GetConnectionString("DefaultConnection");
           
             services.ConfigureDapperConnectionProvider<PostgreSqlConnectionProvider>(Configuration.GetSection("DapperIdentity"))
                 .ConfigureDapperIdentityCryptography(Configuration.GetSection("DapperIdentityCryptography"))
                 .ConfigureDapperIdentityOptions(new DapperIdentityOptions { UseTransactionalBehavior = false }); //Change to True to use Transactions in all operations

             services.AddIdentity<User, UserRole>(x =>
                 {
                     x.Password.RequireDigit = false;
                     x.Password.RequiredLength = 1;
                     x.Password.RequireLowercase = false;
                     x.Password.RequireNonAlphanumeric = false;
                     x.Password.RequireUppercase = false;
                 })
                 .AddDapperIdentityFor<PostgreSqlConfiguration>()
                 .AddDefaultTokenProviders();
             
             
           services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
             .AddJwtBearer(options =>
              {
                 options.TokenValidationParameters = new TokenValidationParameters
                 {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
             
                        ValidIssuer = "http://localhost:5001",
                        ValidAudience = "http://localhost:5001",
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"))
                 };
              });
                   
           services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                    cors =>
                    {
                        cors.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials()
                            .Build();
                    });
            });

           
            services.AddSingleton<ITableRepository<Blend, BlendPreview>, BlendRepository>();
            services.AddSingleton<ITableRepository<Bean, BeanPreview>, BeanRepository>();
            services.AddSingleton<ITableRepository<BusStation>, BusStationRepository>();
            services.AddSingleton<ITableRepository<CoffeeShop, CoffeeShopPreview>, CoffeeShopRepository>();
            services.AddSingleton<ITableRepository<Event>, EventRepository>();
            services.AddSingleton<ITableRepository<CoffeeDrink>, CoffeeDrinkRepository>();
            services.AddSingleton<ITableRepository<Poi>, PoiRepository>();
            services.AddSingleton<ITableRepository<EquipmentCategory>, EquipmentCategoryRepository>();


            //TypeHandler for complex data types in Model
            SqlMapper.AddTypeHandler(new AddressTypeHandler());


            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseCors(MyAllowSpecificOrigins);
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();       
            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}