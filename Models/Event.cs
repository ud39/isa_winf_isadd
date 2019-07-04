using System;
using System.Collections.Generic;
using Dapper.Contrib.Extensions;

namespace WinfADD.Models
{
    public class Event
    {

        public Event()
        {
            CoffeeShops = new CoffeeShopPreview[] {};
        }

        [Key] 
        public int Id { get; set; }
        
        public string Name { get; set; }
        
        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }
        
        public int AccessFee { get; set; }
        
        public string Description { get; set; }
        
        public Image Image { get; set; }
        
        public Address Address { get; set; }
        

        
        
        public IEnumerable<CoffeeShopPreview> CoffeeShops { get; set; }
    }

}