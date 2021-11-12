using API.Base;
using API.Models;
using API.Repository.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("API/[controller]")]
    [ApiController]

    public class EducationController : BaseController<Education, EducationRepository, int>
    {
        public EducationController(EducationRepository educationRepository) : base(educationRepository)
        {

        }
    }
}
