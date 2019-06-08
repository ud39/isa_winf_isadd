using WinfADD.Models;
using WinfADD.Repositories;

namespace WinfADD.Controllers
{
    public class BeanController : GenericTableController<Bean>
    {
        public BeanController(ITableRepository<Bean> tableRepo) : base(tableRepo)
        {
        }
    }
}