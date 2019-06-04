using System.Collections.Generic;
using System.Threading.Tasks;

namespace WinfADD.Models
{
    public interface ITestRepository
    {
        Task<Test> GetByID(string KeyString);
        Task<List<Test>> GetAll();

        bool InsertTest(Test testObj);

        Task<bool> UpdateTest(Test testObj);

        Task<bool> DeleteTest(string KeyString);
    }
}