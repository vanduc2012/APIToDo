using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API_TODO.Models
{
    public class Users
    {
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        public int AuthorityId { get; set; }
        public bool IsDelete { get; set; }
        public Authority Authorities { get; set; }
    }
}
