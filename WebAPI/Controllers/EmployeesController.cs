using API.Models;
using API.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
    public class EmployeesController : BaseController<Employee, EmployeeRepository, string>
    {
        
        private readonly EmployeeRepository repository;
        /*private readonly JwtHandler jwtHandler;*/

        public EmployeesController(EmployeeRepository employeeRepository /*JwtHandler jwtHandler*/) : base(employeeRepository)
        {
            this.repository = employeeRepository;
            /*this.jwtHandler = jwtHandler;*/
        }

        public JsonResult Register(RegisterVM entity)
        {
            var result = repository.Post(entity);
            return Json(result);
        }

        public async Task<JsonResult> GetProfile(string id)
        {
            var result = await repository.GetProfile(id);
            return Json(result);

        }

        public async Task<JsonResult> GetEmployees()
        {
            var result = await repository.GetEmployees();
            return Json(result);
        }
                
        //[ValidateAntiForgeryToken]
        //[HttpPost("Auth/")]
        public async Task<IActionResult> Auth(LoginVM loginVM)
        {
            var jwtToken = await repository.Auth(loginVM);
            var token = jwtToken.Token;
            var message = jwtToken.Message;

            if (token == null)
            {
                return RedirectToAction("ErrorLogin", "Home");
            }

            HttpContext.Session.SetString("JWToken", token);
            //HttpContext.Session.SetString("Name", jwtHandler.GetName(token));
            HttpContext.Session.SetString("ProfilePicture", "assets/img/theme/user.png");

            return RedirectToAction("IndexEmployee", "Home");
        }

        public IActionResult Index()
        {
            return View();
        }

        //Logout
        [Authorize]
        /*[HttpGet("Logout/")]*/
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("LoginPage", "Home");
        }
        
    }
}
