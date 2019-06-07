using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Equipment
    {
        //primary keys
        [Key] public string EquipmentName { get; set; }
        [Key] public string Manufacturer { get; set; }
        [Key] public int YearOfOrigin { get; set; } //TODO check name

        //
        public string Category { get; set; }
        public string PriceClass { get; set; } //TODO here and in CoffeShop -> int?

        //byte
        public string Description { get; set; }




    }
}