using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Bean
    {
        //primary keys
        [Key] public string Name { get; set; }
        [Key] public string ManufacturerName { get; set; }

        public string Provenance { get; set; }
        public string Sort { get; set; } //TODO?
        public int PriceRangeLower { get; set; } //TODO:
        public int PriceRangeUpper { get; set; } //TODO:
        public bool FairTrade { get; set; }
        public string Description { get; set; } //TODO?
    }
}