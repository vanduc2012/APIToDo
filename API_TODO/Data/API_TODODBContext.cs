using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using API_TODO.Models;

    public class API_TODODBContext : DbContext
    {
        public API_TODODBContext (DbContextOptions<API_TODODBContext> options)
            : base(options)
        {
        }

        public DbSet<API_TODO.Models.StudentsModel> StudentsModel { get; set; }

        public DbSet<API_TODO.Models.ClassModel> ClassModel { get; set; }
    }
