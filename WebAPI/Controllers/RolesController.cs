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
    public class RolesController : BaseController<Role, RoleRepository, int>
    {

        public RolesController(RoleRepository roleRepository) : base(roleRepository)
        {

        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
