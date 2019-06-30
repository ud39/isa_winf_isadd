using System;
using System.Data.SqlTypes;
using System.Globalization;

namespace WinfADD.Models
{
    public class OpeningTime
    {
        public TimeSpan Open { get; set; }
        public TimeSpan Close { get; set; }
        public string Weekday { get; set; }
        
    }

}