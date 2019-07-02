using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WinfADD.Models;
using WinfADD.Repositories;      
using Microsoft.AspNetCore.Authorization;

namespace WinfADD.Controllers
{
    
    [AllowAnonymous]
    public class EquipmentCategoryController : GenericTableController<EquipmentCategory>
    {
        
        public EquipmentCategoryController(ITableRepository<EquipmentCategory> tableRepo) : base(tableRepo)
        {
        }
        
        
        [HttpGet("all")]
        public override async Task<IEnumerable<EquipmentCategory>> GetAll()
        {
            return await _tableRepo.GetAll();
        }
    }
}