using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace WinfADD.Models
{
    public class CoffeeShop
    {

        public CoffeeShop()
        {
            Address = new Address();
        }


        //primary keys
        [Key] public string Name { get; set; }
        //address: (country, town, postal_code, street_number, street_name, addressee)
        

        //ints
        public int Founding_Year { get; set; }

        //strings
        public string Website { get; set; }
        public int Seats { get; set; }
        public string Food { get; set; }  //warm,cold
        public string Price_Class { get; set; } //could be a int


        //boolean flags
        public bool Wlan { get; set; }
        public bool Disabled_Friendly { get; set; }
        public bool Fair_Trade { get; set; }
        public bool Child_Friendly { get; set; }
        public bool Workstation { get; set; }
        public bool Latte_Art { get; set; }
        public bool Pets_Friendly { get; set; }
        public bool Outdoor { get; set; }

        public string Franchise { get; set; }

        //TODO EcoSeal + Image/Thumbnail
        //public bool EcoSeal { get; set; }




        //byte
        public string Description { get; set; }
        //public string Thumbnail { get; set; }
        //public string[] Images { get; set; }

        public Address Address { get; set; }


        //complex
        //TODO
        //public  opening_time { get; set; }
        //<weedkday, opentime, closetime>
        //holidays?



    }
}