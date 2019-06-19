using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class BusStation
    {
        //primary keys
        [Key] public string Name { get; set; }

        public int Line { get; set; }
    }
}