using Dapper.Contrib.Extensions;

namespace WinfADD.Models
{
    public class Event
    {   
        [Key] 
        public int event_id { get; set; }
        
        public string time { get; set; }
        
        public int access_fee { get; set; }
        
        public string description { get; set; }
    }
}