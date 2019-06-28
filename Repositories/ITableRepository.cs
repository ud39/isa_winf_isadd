using System.Collections.Generic;
using System.Threading.Tasks;
using WinfADD.Models;

namespace WinfADD.Repositories
{
    public interface ITableRepository<Table>
    {
        Task<List<Table>> GetAll();

        Task<Table> GetById(Table tableObj);
        
        Task<IEnumerable<Table>> GetTables(Table tableObj, IDictionary<string, dynamic> searchProperties);

        Task<bool> InsertTable(Table tableObj, IDictionary<string, dynamic> insertProperties);

        Task<bool> DeleteTable(Table tableObj);

        Task<bool> UpdateTable(Table testObj);

        Task<bool> PartialUpdateTable(Table tableObj, IDictionary<string, dynamic> fieldsToChange);


    }
}