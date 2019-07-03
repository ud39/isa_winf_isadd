using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Blend
    {
        //primary keys
        [Key] public string Name { get; set; }
        [Key] public string ManufacturerName { get; set; }

        public string Provenance { get; set; }
        
        public string PriceClass { get; set; }
       
    }
}