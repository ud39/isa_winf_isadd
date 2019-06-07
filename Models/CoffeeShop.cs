using System;
using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class coffee_shop
    {
        //primary keys
        [Key] public string coffee_shopName { get; set; }
        //address: (street, postcode, placename, number)
        [Key] public string Street { get; set; }
        [Key] public int Postcode { get; set; }
        [Key] public string PlaceName { get; set; }
        [Key] public int Number { get; set; }


        //ints
        public int FoundingYear { get; set; }

        //strings
        public string Website { get; set; }
        public string Seats { get; set; }
        public string Food { get; set; }  //warm,cold
        public string PriceRange { get; set; } //could be a int


        //boolean flags
        public bool Wlan { get; set; }
        public bool DisabledFriendly { get; set; }
        public bool FairTrade { get; set; }
        public bool EcoSeal { get; set; }
        public bool ChildFriendly { get; set; }
        public bool Workstation { get; set; }
        public bool LatteArt { get; set; }
        public bool PetFriendly { get; set; }
        public bool Outdoor { get; set; }
        public bool Franchise { get; set; }




        //byte
        public string Description { get; set; }
        public string Thumbnail { get; set; }
        public string[] Images { get; set; }


        //complex
        //TODO
        //public  opening_time { get; set; }
        //<weedkday, opentime, closetime>
        //holidays?



    }
}