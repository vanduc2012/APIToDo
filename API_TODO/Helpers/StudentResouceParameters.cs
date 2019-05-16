using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_TODO.Helpers
{
    public class StudentResouceParameters:PaginationResourceParameters
    {
        public string CodeView { get; set; }
        public string Name { get; set; }
        
        public DateTime BirthDay { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Genre { get; set; }
        public bool IsDelete { get; set; }
        public int ClassesId { get; set; }
       
    }
}
