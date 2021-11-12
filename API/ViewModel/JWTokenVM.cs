using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.ViewModel
{
    public class JWTokenVM
    {
        [Required]
        public string Message { get; set; }
        [Required]
        public string Token { get; set; }
    }
}
