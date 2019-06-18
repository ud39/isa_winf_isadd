using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Image
    {
        //primary keys
        [Key] public string File_Name { get; set; }

        public string content_type { get; set; }


    }
}