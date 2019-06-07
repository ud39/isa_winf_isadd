using Dapper;
using Dapper.Contrib.Extensions;

namespace WinfADD.Models
{
    public class Test
    {


        [ExplicitKey] public string KeyString { get; set; }
         public long Id { get; set; }

        
        public string Name { get; set; }
        
        public string Random { get; set; }

    }
}