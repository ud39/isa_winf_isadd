using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Address
    {
        public string Country { get; set; }
         public string Town { get; set; }
         public int Postal_Code { get; set; }
         public string Street_Name { get; set; }
         public int Street_Number { get; set; }

    }
}