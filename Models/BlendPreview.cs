using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WinfADD.Models
{
    public class BlendPreview
    {
        [Key] public string Name { get; set; }

        public string Provenance { get; set; }
        public string ImageFileName { get; set; }
        public IEnumerable<BeanPreview> Beans { get; set; }

    }
}