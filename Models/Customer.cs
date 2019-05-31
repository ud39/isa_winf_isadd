using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Customer
    {
        [Key]
        public long Id { get; set; }
 
        [Required]
        public string Name { get; set; }
 
        [Required]
        public string Email { get; set; }
 
        [Required]
        public string Phone { get; set; }
 
 
        public string Address { get; set; }
    }
}