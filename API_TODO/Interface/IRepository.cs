using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_TODO.Interface
{
    public interface IRepository<Tentity> where Tentity: class
    {
        void Add(Tentity entity);
        void Update(Tentity entity);
        IQueryable<Tentity> Get();
        Tentity Get(int id);
        void Delete(Tentity entity);
        Task<bool> SaveChangesAsync();
    }
}
