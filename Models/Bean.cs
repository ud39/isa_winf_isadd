using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Bean
    {
        //primary keys
        [Key] public string Name { get; set; }
        [Key] public string Provenance { get; set; }

        public string ManufacturerName { get; set; }
        public string PriceClass { get; set; }
        public bool FairTrade { get; set; }
        public string Description { get; set; }
    }
}