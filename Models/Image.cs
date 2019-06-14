using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class Image
    {
        //primary keys
        [Key] public int ImageID { get; set; }

        public string Name { get; set; }
        public int FilePath { get; set; }
    }
}