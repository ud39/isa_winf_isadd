using System.Collections.Generic;
using System.Threading.Tasks;

namespace WinfADD.Models
{
    public interface IDummyRepository
    {
        Task<Dummy> GetByID(long id);
        Task<List<Dummy>> GetAll();

        Task <Dummy> AddDummy(long id);
    }
}