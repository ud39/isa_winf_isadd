using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class BusStation
    {
        //primary keys
        [Key] public string BusStationName { get; set; }

        //
        public int Line { get; set; }
    }
}