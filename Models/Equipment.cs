using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Equipment
    {
        //primary keys
        [Key] public string ModelName { get; set; }
        [Key] public string ManufacturerName { get; set; }
        [Key] public int YearOfOrigin { get; set; } 

        //
        public string Category { get; set; }
        public string PriceClass { get; set; } 

        //byte
        public string Description { get; set; }




    }
}