﻿using API.Base;
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

    public class UniversitiesController : BaseController<University, UniversityRepository, int>
    {
        public UniversitiesController(UniversityRepository universityRepository) : base(universityRepository)
        {

        }
    }
}
