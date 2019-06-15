using System;
using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Address
    {
         
         public string country { get; set; }
         public string town { get; set; }
         public int postal_code { get; set; }
         public string street_name { get; set; }
         public int street_number { get; set; }


         public string ToString()
         {
             return street_name + "," + street_number + "," + postal_code + "," + town + "," + country;
         }

    }

}