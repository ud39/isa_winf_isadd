using System;
using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Address
    {
         
         public string Country { get; set; }
         public string Town { get; set; }
         public int PostalCode { get; set; }
         public string StreetName { get; set; }
         public int StreetNumber { get; set; }


         public override string ToString()
         {
             return StreetName + "," + StreetNumber + "," + PostalCode + "," + Town + "," + Country;
         }

    }

}