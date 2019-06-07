using System.Collections.Generic;
using System.Threading.Tasks;
using WinfADD.Models;

namespace WinfADD.Repositories
{
    public interface ITableRepository<Table>
    {

        Task<Table> GetByID(Table tableObj);
        Task<List<Table>> GetAll(Table tableObj);

       // Task<bool> InsertTest(Table tableObj);

        //Task<IEnumerable<Blend>> GetTests(Table tableObj, IDictionary<string, string> searchProperties);


        Task<bool> UpdateTable(Table testObj);

       // Task<bool> PartialUpdateTest(Table tableObj, IDictionary<string, string> fieldsToChange);

        //Task<bool> DeleteTest(Table tableObj);
    }
}