using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Actor
    {
        //primary keys
        [Key] public string Email { get; set; }

        [Required] public string Password { get; set; }
        [Required] public string Name { get; set; }

    }
}