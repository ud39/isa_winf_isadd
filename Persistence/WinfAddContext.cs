using Microsoft.EntityFrameworkCore;
using WinfADD.Models;

namespace WinfADD.Persistence
{
    public class WinfAddContext : DbContext
    {

        public WinfAddContext(DbContextOptions<WinfAddContext> options) : base(options){
            
        }
        
        public DbSet<Test> Dummies { get; set; }

    }
}