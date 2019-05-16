using API_TODO.Helpers;
using API_TODO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_TODO.Interface
{
    public interface IStudentRepository:IRepository<StudentsModel>
    {
        PageList<StudentsModel> GetStudent(StudentResouceParameters studentResouceParameters);
    }
}
