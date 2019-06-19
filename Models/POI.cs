using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Poi
    {
        //primary keys
        [Key] public string Name { get; set; }
        [Key] public Address Address { get; set; }
        
        //
        public string Description { get; set; }
        public string Thumbnail { get; set; }
    }
}