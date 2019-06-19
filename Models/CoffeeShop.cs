using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class CoffeeShop
    {

        public CoffeeShop()
        {
            Events = new Event[] {};
            Images = new Image[] {};
        }
        
        //primary key
        
        [Key] public int Id { get; set; }
        
        public string Name { get; set; }



        //ints
        public int FoundingYear { get; set; }
        public int Seats { get; set; }
        
        //strings
        public string Website { get; set; }
        public string Food { get; set; }  //warm,cold
        public string PriceClass { get; set; }
        public string Franchise { get; set; }

        //boolean flags
        public bool Wlan { get; set; }
        public bool DisabledFriendly { get; set; }
        public bool FairTrade { get; set; }
        public bool ChildFriendly { get; set; }
        public bool Workstation { get; set; }
        public bool LatteArt { get; set; }
        public bool PetsFriendly { get; set; }
        public bool Outdoor { get; set; }

        //byte
        private string Description { get; set; }

        //complex
        //TODO
        //public  opening_time { get; set; }
        //<weedkday, opentime, closetime>
        //holidays?

        public Address Address { get; set; }
        
        public IEnumerable<Event> Events { get; set; }
        public IEnumerable<Image> Images { get; set; }
    }
}