using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Location
    {
        //primary keys
        [Key] public string LocationName { get; set; }
        //address: (street, postcode, placename, number)
        [Key] public string Street { get; set; }
        [Key] public int Postcode { get; set; }
        [Key] public string PlaceName { get; set; }
        [Key] public int Number { get; set; }


        //bytea
        public string Description { get; set; }
    }
}