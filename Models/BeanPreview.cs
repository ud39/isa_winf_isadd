using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class BeanPreview
    {
        //primary keys
        [Key] public string Name { get; set; }

        public string Provenance { get; set; }
        public string roast { get; set; }
        public string grind { get; set; }
        public string ImageFileName { get; set; }

    }
}