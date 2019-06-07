using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WinfADD.Models
{
    public interface ITestRepository
    {

        Task<Test> GetByID(string KeyString);
        Task<List<Test>> GetAll();

        Task<bool> InsertTest(Test testObj);

        Task<IEnumerable<Test>> GetTests(Test testObj, IDictionary<string, string> searchProperties);


        Task<bool> UpdateTest(Test testObj);

        Task<bool> PartialUpdateTest(Test testObj, IDictionary<string, string> fieldsToChange);

        Task<bool> DeleteTest(string KeyString);
    }
}