using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_TODO.Models
{
    public class PagingParameterModel
    {
        const int maxPageSize = 20;
        public int PageNumber { get; set; } = 1;
        public int _PageSize { get; set; } = 5;
        public int pageSize
        {
            get { return _PageSize; }
            set
            {
                _PageSize = (value > maxPageSize) ? maxPageSize : value;
            }
        }
    }
}
