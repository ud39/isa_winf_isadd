using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class BusStation
    {
        //primary keys
        [Key] public string Name { get; set; }

        [Key] public string Line { get; set; }
    }
}