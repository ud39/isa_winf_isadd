using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class CoffeeShopUpdateModel
    {

        public CoffeeShopUpdateModel()
        {
            EventsInsert = new Event[] {};
            EventsDelete = new Event[] {};
            ImagesInsert = new Image[] {};
            ImagesDelete = new Image[] {};
            ReachableByBusInsert = new BusStation[] {};
            ReachableByBusDelete = new BusStation[] {};
            CoffeeDrinksInsert = new CoffeeDrink[] {};
            CoffeeDrinksDelete = new CoffeeDrink[] {};
            POIsInsert = new Poi[] {};
            POIsDelete = new Poi[] {};
            EquipmentCategoriesInsert = new EquipmentCategory[] {};
            EquipmentCategoriesDelete = new EquipmentCategory[] {};
            BeansInsert = new Bean[] {};
            BeansDelete = new Bean[] {};
            BlendsInsert = new Blend[] {};
            BlendsDelete = new Blend[] {};
            OpeningTimesInsert = new OpeningTime[] {};
            OpeningTimesDelete = new OpeningTime[] {};

        }
        
        //primary key
        
        [Key] public int Id { get; set; }
        
        public string Name { get; set; }



        //ints
        public int FoundingYear { get; set; }
        public int Seats { get; set; }
        
        //strings
        public string CompanyName { get; set; }
        public string Website { get; set; }
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
        public bool WarmFood { get; set; }
        public bool ColdFood { get; set; }


        //byte
        public string Description { get; set; }

        public Address Address { get; set; }
        
        //public IEnumerable<Event> Events { get; set; }
        public IEnumerable<Event> EventsInsert { get; set; }
        public IEnumerable<Event> EventsDelete{ get; set; }

        public IEnumerable<Image> ImagesInsert { get; set; }
        public IEnumerable<Image> ImagesDelete { get; set; }
        public IEnumerable<BusStation> ReachableByBusInsert { get; set; }
        public IEnumerable<BusStation> ReachableByBusDelete { get; set; }

        public IEnumerable<CoffeeDrink> CoffeeDrinksInsert{ get; set; }
        public IEnumerable<CoffeeDrink> CoffeeDrinksDelete{ get; set; }
        public IEnumerable<Poi> POIsInsert { get; set; }
        public IEnumerable<Poi> POIsDelete { get; set; }

        public IEnumerable<EquipmentCategory> EquipmentCategoriesInsert { get; set; }
        public IEnumerable<EquipmentCategory> EquipmentCategoriesDelete { get; set; }
        public IEnumerable<Bean> BeansInsert{ get; set; }
        public IEnumerable<Bean> BeansDelete{ get; set; }
        public IEnumerable<Blend> BlendsInsert{ get; set; }
        public IEnumerable<Blend> BlendsDelete{ get; set; }
        public IEnumerable<OpeningTime> OpeningTimesInsert{ get; set; }
        public IEnumerable<OpeningTime> OpeningTimesDelete{ get; set; }



    }
}