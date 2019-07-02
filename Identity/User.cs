using Identity.Dapper.Entities;

namespace WinfADD.Identity
{
    public class User : DapperIdentityUser
    {
        public User() { }
        public User(string userName) : base(userName) { }
    }
}