using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class coffee_drink
    {
        //primary keys
        [Key] public string coffee_drinkName { get; set; }

        //
        public string WarmCold { get; set; } //TODO name

        //bytea
        public string Description { get; set; }
    }
}