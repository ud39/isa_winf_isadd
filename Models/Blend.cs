using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Blend
    {
        //primary keys
        [Key] public string Blend_Name { get; set; }
        [Key] public string Manufacturer { get; set; }

        //
        public string Provenance { get; set; }

        //
        public int PriceRangeUpper { get; set; }
        public int PriceRangeLower { get; set; }

        //
        //public bool FairTrade { get; set; } //TODO change in Herm, Translation or from beans


        //bytea
        //TODO public string Description { get; set; }
    }
}