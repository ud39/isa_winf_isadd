using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Dummy
    {
        [Required][Key] public long Id { get; set; }
        
        public string Name { get; set; }
        
        public string Random { get; set; }

    }
}