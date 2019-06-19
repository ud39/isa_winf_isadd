using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class CoffeeDrink
    {
        //primary keys
        [Key] public string CoffeeDrinkName { get; set; }

        public string WarmCold { get; set; } //TODO name

        //bytea
        public string Description { get; set; }
        
        public string Type{ get; set; }

    }
}