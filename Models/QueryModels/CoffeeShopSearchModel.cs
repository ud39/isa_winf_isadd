using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class CoffeeShopSearchModel
    {
        
        public string Name { get; set; }
        public string FoundingYear { get; set; }
        public string Seats { get; set; }
        public string Website { get; set; }
        public string PriceClass { get; set; }
        public string Franchise { get; set; }
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
        public string Description { get; set; }
        public string BusStation { get; set; }
        public string StreetNumber { get; set; }
        public string StreetName { get; set; }
        public string Town { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        
        public string[] Poi  { get; set; }


    }
}