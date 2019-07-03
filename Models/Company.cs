using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Company
    {
        //primary keys
        [Required] public string Name { get; set; }

    }
}