using System;
using System.Data.SqlTypes;
using System.Globalization;

namespace WinfADD.Models
{
    public class OpeningTime
    {
        public DateTime Open { get; set; }
        public DateTime Close { get; set; }
        public string Weekday { get; set; }
        
    }

}