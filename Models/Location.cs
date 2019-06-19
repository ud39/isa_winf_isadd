using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Location
    {
        //primary keys
        [Key] public string LocationName { get; set; }
        [Key] public Address Address { get; set; }

        //bytea
        public string Description { get; set; }
    }
}