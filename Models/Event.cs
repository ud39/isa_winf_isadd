using System;
using System.Collections.Generic;
using Dapper.Contrib.Extensions;

namespace WinfADD.Models
{
    public class Event
    {

        public Event(){
            Images = new List<Image>();
        }
        
        [Key] 
        public int Id { get; set; }
        
        public string Name { get; set; }
        
        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }
        
        public int AccessFee { get; set; }
        
        public string Description { get; set; }
        
        public string PreviewImageFileName { get; set; }
        
        public List<Image> Images { get; set; }
    }

}