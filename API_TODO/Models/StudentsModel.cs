using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API_TODO.Models
{
 
    public class StudentsModel
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(8, ErrorMessage = "Maxlength: 8")]
        public string CodeView { get; set; }
        public string Name { get; set; }
        [DataType(DataType.Date)]

        public DateTime BirthDay { get; set; }
        public string Address { get; set; }

        [MaxLength(11,ErrorMessage ="Phone number only 11 char max.")]
        public string PhoneNumber { get; set; }
        public string Genre { get; set; }
        public bool IsDelete { get; set; }
        public int ClassesId { get; set; }
        public ClassModel Classes { get; set; }
    }
   
}
