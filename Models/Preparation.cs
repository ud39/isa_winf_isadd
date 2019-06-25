using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Preparation
    {

        [Key] public string Name { get; set; }

        //
        public string Description { get; set; }
        public string type { get; set; }
    }
}