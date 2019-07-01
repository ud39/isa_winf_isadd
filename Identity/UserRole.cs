using Identity.Dapper.Entities;

namespace WinfADD.Identity
{
    public class UserRole : DapperIdentityRole
    {

        public UserRole() { }
        public UserRole(string roleName) : base(roleName)
        {
        }
    }
}