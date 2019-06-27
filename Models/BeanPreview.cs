using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class BeanPreview
    {
        //primary keys
        [Key] public string Name { get; set; }

        public string Provenance { get; set; }
        public string Type { get; set; }
        public string ImageFileName { get; set; }

    }
}