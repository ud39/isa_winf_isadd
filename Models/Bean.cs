using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Bean
    {
        //primary keys
        [Key] public string Name { get; set; }
        [Key] public string Provenance { get; set; }
        public string type { get; set; }
    }
}