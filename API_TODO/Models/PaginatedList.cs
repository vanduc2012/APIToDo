using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_TODO.Models
{
    public class PaginatedList<T> : List<T>
    {
        public int TotalItems { get; }
        public int PageNumber { get; }
        public int PageSize { get; }
        public List<T> List { get; }
        public int TotalPages =>
            (int)Math.Ceiling(this.TotalItems / (double)this.PageSize);
        public bool HasPreviousPage => this.PageNumber > 1;
        public bool HasNextPage => this.PageNumber < this.TotalPages;
        public int NextPageNumber =>
            this.HasNextPage ? this.PageNumber + 1 : this.TotalPages;
        public int PreviousPageNumber =>
            this.HasPreviousPage ? this.PageNumber - 1 : 1;
        
        public PaginatedList(IQueryable<T> source, int pageNumber, int pageSize)
        {
            this.TotalItems = source.Count();
            this.PageNumber = PageNumber;
            this.PageSize = PageSize;
            this.List = source.Skip(PageSize * (pageNumber - 1)).Take(PageSize).ToList();
        }
    }
}
