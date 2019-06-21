using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Image
    {
        //primary keys
        [Key] public string FileName { get; set; }

        public string ContentType { get; set; }

    }
}