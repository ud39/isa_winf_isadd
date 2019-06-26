using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class CoffeeShopPreview
    {
        //primary key
        [Key] public int Id { get; set; }
        
        public string Name { get; set; }

        public string Description { get; set; }

        public string ImageFileName { get; set; }
        
        public string AverageTotalRating { get; set; }
        
        public Address Address { get; set; }

        
    }
}