using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WinfADD.Models;
using WinfADD.Repositories;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json.Linq;

namespace WinfADD.Controllers
{
    [AllowAnonymous]
    public class BlendController : GenericTableController<Blend, BlendPreview>
    {
        
        private BlendRepository _blendRepository;
        
        public BlendController(ITableRepository<Blend, BlendPreview> tableRepo) : base(tableRepo)
        {
            _blendRepository = (BlendRepository)tableRepo;
        }
        
        [HttpGet("all")]
        public new async Task<IEnumerable<BlendPreview>> GetAll()
        {
            return await  _blendRepository.GetAll();
        }
        
        [HttpGet("GetById")]
        public new async Task<ActionResult<BlendPreview>> GetById([FromQuery] Blend blend)
        {
            return await _blendRepository.GetById(blend);
        }

        
        [HttpPost("insert")]
        public override async Task<bool> insert(JToken jToken)
        {

            var blendObj = jToken.ToObject<BlendInsertModel>();
            var jObj = jToken.ToObject<JObject>();
            IDictionary<string, dynamic> propertyValues = new Dictionary<string, dynamic>();
            foreach (var (propertyName, value) in jObj) {propertyValues.Add(propertyName, value);}
            // foreach (var pair in jObj) {propertyValues.Add(pair.Key, pair.Value);}



            return await _blendRepository.InsertTable(blendObj, propertyValues);
        }
        
        
        
    }
}