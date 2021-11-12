using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Base.Controllers;
using WebAPI.Repositories.Data;

namespace WebAPI.Controllers
{
    //[Authorize]
    public class UniversitiesController : BaseController<University, UniversityRepository, int>
    {

        public UniversitiesController(UniversityRepository universityRepository) : base(universityRepository)
        {

        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
