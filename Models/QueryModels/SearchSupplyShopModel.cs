using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class SearchSupplyShopModel
    {
        
        public string Name { get; set; }
        
        public string PriceClass { get; set; }
        
        public string[] Poi  { get; set; }
        
        public string[] EquipmentCategories  { get; set; }
        
        public string[] BusStation  { get; set; }
        
        public string StreetNumber { get; set; }
        public string StreetName { get; set; }
        public string Town { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }

    }
}


