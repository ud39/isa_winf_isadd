using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class CoffeeDrink
    {
        //primary keys
        [Key] public string Name { get; set; }

        public string Description { get; set; }
        
        public string Type{ get; set; }

        public bool vegan { get; set; }

        public IEnumerable<Preparation> Preparations{ get; set; }

    }
}