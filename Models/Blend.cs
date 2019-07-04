using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Blend
    {
        //primary keys
        [Key] public string Name { get; set; }
        public string Provenance { get; set; }
        
    }
}