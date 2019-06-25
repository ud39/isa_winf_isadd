using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class CoffeeShopSearchModel
    {


        public  string Name { get; set; }

        public string FoundingYear { get; set; }
        public string Seats { get; set; }
        
        //strings
        public string Website { get; set; }
        public string Food { get; set; }  //warm,cold
        public string PriceClass { get; set; }
        public string Franchise { get; set; }

        //boolean flags
        public string Wlan { get; set; }
        public string DisabledFriendly { get; set; }
        public string FairTrade { get; set; }
        public string ChildFriendly { get; set; }
        public string Workstation { get; set; }
        public string LatteArt { get; set; }
        public string PetsFriendly { get; set; }
        public string Outdoor { get; set; }
        public string WarmFood { get; set; }
        public string ColdFood { get; set; }

        //byte
        public string Description { get; set; }


    }
}