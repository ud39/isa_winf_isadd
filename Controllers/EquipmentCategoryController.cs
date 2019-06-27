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
        
    }
}