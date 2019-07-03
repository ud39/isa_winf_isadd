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
            CoffeeDrinks = new CoffeeDrink[] {};
            ListOfPoi = new Poi[] {};
            ReachableByBus = new BusStation[] {};
            EquipmentCategories = new EquipmentCategory[] {};
            Beans = new Bean[] {};
            Blends = new Blend[] {};
            OpeningTimes = new OpeningTime[] {};

        }
        
        //primary key
        
        [Key] public int Id { get; set; }
        
        public string Name { get; set; }



        //ints
        public int ? FoundingYear { get; set; }
        public int ? Seats { get; set; }
        
        //strings
        public string CompanyName { get; set; }
        public string Website { get; set; }
        public string PriceClass { get; set; }
        public string Franchise { get; set; }

        //boolean flags
        public bool ? Wlan { get; set; }
        public bool ? DisabledFriendly { get; set; }
        public bool ? FairTrade { get; set; }
        public bool ? ChildFriendly { get; set; }
        public bool ? Workstation { get; set; }
        public bool ? LatteArt { get; set; }
        public bool ? PetsFriendly { get; set; }
        public bool ? Outdoor { get; set; }
        public bool ? WarmFood { get; set; }
        public bool ? ColdFood { get; set; }


        //byte
        public string Description { get; set; }

        public Address Address { get; set; }
        
        public IEnumerable<Event> Events { get; set; }
        public IEnumerable<Image> Images { get; set; }
        public IEnumerable<CoffeeDrink> CoffeeDrinks{ get; set; }
        public IEnumerable<Poi> ListOfPoi { get; set; }
        public IEnumerable<BusStation> ReachableByBus { get; set; }
        public IEnumerable<EquipmentCategory> EquipmentCategories { get; set; }
        public IEnumerable<Bean> Beans{ get; set; }
        public IEnumerable<Blend> Blends{ get; set; }
        public IEnumerable<OpeningTime> OpeningTimes{ get; set; }

        
        
    }
}