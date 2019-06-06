using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Blend
    {
        //primary keys
        [Key] public string BlendName { get; set; }
        [Key] public string Manufacturer { get; set; }

        //
        public string Provenance { get; set; }

        //
        public int PriceRangeUpper { get; set; }
        public int PriceRangeLower { get; set; }

        //
        //public bool FairTrade { get; set; } //TODO change in Herm, Translation or from beans


        //bytea
        public string Description { get; set; }
    }
}