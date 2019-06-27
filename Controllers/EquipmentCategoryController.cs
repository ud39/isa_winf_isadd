using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WinfADD.Models;
using WinfADD.Repositories;

namespace WinfADD.Controllers
{
    public class EquipmentCategoryController : GenericTableController<EquipmentCategory>
    {
        
        public EquipmentCategoryController(ITableRepository<EquipmentCategory> tableRepo) : base(tableRepo)
        {
        }
        
        
        [HttpGet("allpreview")]
        public async Task<List<EquipmentCategory>> GetAll()
        {
            return await _tableRepo.GetAll();
        }
    }
}