using Dapper.Contrib.Extensions;

namespace WinfADD.Models
{
    public class Event
    {   
        [Key] 
        public int Id { get; set; }
        
        public string Time { get; set; }
        
        public int AccessFee { get; set; }
        
        public string Description { get; set; }
    }
}