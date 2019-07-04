using Dapper.Contrib.Extensions;

namespace WinfADD.Models
{
    
    public class BlendInsertModel{
        
    [Key] public string Name { get; set; }
    public string Provenance { get; set; }
        
    public Bean[] Beans { get; set; }
    }
}