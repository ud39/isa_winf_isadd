using WinfADD.Models;
using WinfADD.Repositories;

namespace WinfADD.Controllers
{
    public class BlendController : GenericTableController<Blend>
    {
        public BlendController(ITableRepository<Blend> tableRepo) : base(tableRepo)
        {
        }
    }
}