using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class CoffeeShopInsertModel
    {

        //primary key

        [Key] public int Id { get; set; }

        public string Name { get; set; }



        //ints
        public int FoundingYear { get; set; }
        public int Seats { get; set; }

        //strings
        public string Website { get; set; }
        public string PriceClass { get; set; }
        public string Franchise { get; set; }
        public string CompanyName { get; set; }

        //boolean flags
        public bool Wlan { get; set; }
        public bool DisabledFriendly { get; set; }
        public bool FairTrade { get; set; }
        public bool ChildFriendly { get; set; }
        public bool Workstation { get; set; }
        public bool LatteArt { get; set; }
        public bool PetsFriendly { get; set; }
        public bool Outdoor { get; set; }
        public bool warmFood { get; set; }
        public bool coldFood { get; set; }

        //byte
        public string Description { get; set; }

        public Address Address { get; set; }


    }
}