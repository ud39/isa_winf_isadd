using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Actor
    {
        //primary keys
        [Key] public string email { get; set; }

        //
        [Required] public string password { get; set; }
        [Required] public string name { get; set; }

    }
}