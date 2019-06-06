using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Bean
    {
        //primary keys
        [Key] public string BeanName { get; set; }
        [Key] public string Manufacturer { get; set; }

        //
        public string Provenance { get; set; }
        public string Sort { get; set; }

        //
        public int PriceRangeLower { get; set; }
        public int PriceRangeUpper { get; set; }

        //
        public bool FairTrade { get; set; }


        //bytea
        public string Description { get; set; }
    }
}