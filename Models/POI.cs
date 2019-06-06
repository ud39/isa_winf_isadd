using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Poi
    {
        //primary keys
        [Key] public string POIName { get; set; }
        //address: (street, postcode, placename, number)
        [Key] public string Street { get; set; }
        [Key] public int Postcode { get; set; }
        [Key] public string Placename { get; set; }
        [Key] public int Number { get; set; }

        //
        public string Discription { get; set; }
        public string Thumbnail { get; set; }
    }
}