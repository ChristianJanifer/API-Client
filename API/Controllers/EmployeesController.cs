using API.Base;
using API.Context;
using API.Models;
using API.Repository.Data;
using API.Repository.Interface;
using API.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class EmployeesController : BaseController<Employee, EmployeeRepository, string>
    {
        private readonly EmployeeRepository employeeRepository;
        public IConfiguration _configuration;
        private readonly MyContext myContext;

        public EmployeesController(EmployeeRepository employeeRepository, IConfiguration configuration, MyContext myContext) : base(employeeRepository)
        {
            this.employeeRepository = employeeRepository;
            this._configuration = configuration;
            this.myContext = myContext;
        }
        
        [Route("Register")]
        [HttpPost]
        public ActionResult Register(RegisterVM registerVM)
        {
            var result = employeeRepository.Register(registerVM);
            //return Ok(new { status = HttpStatusCode.OK, result = result, message = "Data berhasil dimasukkan" });
            if (result == 2)
            {
                return BadRequest(new { status = HttpStatusCode.BadRequest, message = "Data gagal dimasukkan : NIK yang Anda masukkan SUDAH TERDAFTAR!!!" });
            }
            else if (result == 3)
            {
                return BadRequest(new { status = HttpStatusCode.BadRequest, message = "Data gagal dimasukkan : NO HP yang Anda masukkan SUDAH TERDAFTAR!!!" });
            }
            else if (result == 4)
            {
                return BadRequest(new { status = HttpStatusCode.BadRequest, message = "Data gagal dimasukkan : EMAIL yang Anda masukkan SUDAH TERDAFTAR!!!" });
            }
            else if (result == 5)
            {
                return BadRequest(new { status = HttpStatusCode.BadRequest, message = "Data gagal dimasukkan : UNIVERSITY ID yang Anda masukkan TIDAK TERDAFTAR!!!" });
            }
            return Ok(new { status = HttpStatusCode.OK, result = result, message = "Data berhasil dimasukkan" });
            //return Ok(result);
        }

        [HttpGet]
        [Route("Register")]
        public ActionResult<RegisterVM> GetProfileRegister()
        {
            var result = employeeRepository.GetProfile();
            if (result.ToList().Count > 0)
            {
                return Ok(new { status = HttpStatusCode.OK, result = result, message = "Data berhasil ditampilkan" });
                //return Ok(result);
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.NotFound, result = result, message = "Tidak ada data di sini" });
            }
        }

        /*[Route("SignManager")]
        [HttpPost]
        public ActionResult SignManager(SignManagerVM signManagerVM)
        {
            var result = employeeRepository.SignManager(signManagerVM);
            if (result == 2)
            {
                return BadRequest(new { status = HttpStatusCode.BadRequest, message = "Data gagal dimasukkan: EMAIL yang Anda masukkan TIDAK TERDAFTAR!!!" });
            }
            return Ok(new { status = HttpStatusCode.BadRequest, result = result, message = "Login Gagal, Password Anda Masukan SALAH" });
        }*/

        [Route("Login")]
        [HttpPost]
        public ActionResult Login(LoginVM loginVM)
        {
            var result = employeeRepository.Login(loginVM);
            if (result == 2)
            {
                return BadRequest(new { status = HttpStatusCode.BadRequest, 
                    message = "Data gagal dimasukkan : EMAIL yang Anda masukkan TIDAK TERDAFTAR!!!" });
            }
            else if (result == 3)
            {
                var getRoles = employeeRepository.GetRole(loginVM.Email);

                var data = new LoginVM()
                {
                    Email = loginVM.Email,
                };

                var claims = new List<Claim>
                {
                    new Claim("Email", data.Email),
                };

                foreach (var item in getRoles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, item.ToString()));
                }

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var sigIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken
                    (
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(10),
                        signingCredentials: sigIn
                    );

                var idToken = new JwtSecurityTokenHandler().WriteToken(token);
                claims.Add(new Claim("TokenSecurity", idToken.ToString()));
                /*return Ok(new { status = HttpStatusCode.OK, idtoken, message = "Login Berhasil" });*/
                return Ok(new JWTokenVM
                {
                    /* status = HttpStatusCode.OK, */
                    Token = idToken,
                    Message = "Login Berhasil!!"
                });
            }
            else
            {
                return Ok(new { status = HttpStatusCode.BadRequest, message = "Login Gagal" });
            }
        }

        [Route("Profile/{NIK}")]
        public ActionResult<RegisterVM> GetProfileNik(string NIK)
        {
            var ada = employeeRepository.GetProfileNik(NIK);
            if (ada != null)
            {
                //return Ok(new { status = HttpStatusCode.OK, result = ada, message = $"Data berhasil ditampilkan dengan Nik : {NIK}" });
                return Ok(ada);
            }
            return NotFound(new { status = HttpStatusCode.NotFound, result = ada, message = $"Data dengan NIK {NIK} tidak ditemukan" });
        }

        //[Authorize(Roles = "Director, Manager")]
        [HttpGet]
        [Route("Profile")]
        public ActionResult<RegisterVM> GetProfile()
        {
            var result = employeeRepository.GetProfile();
            if (result.ToList().Count > 0)
            {
                //return Ok(new { status = HttpStatusCode.OK, result = result, message = "Data berhasil ditampilkan" });
                return Ok(result);
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.NotFound, result = result, message = "Tidak ada data di sini" });
            }
        }

        [HttpGet]
        [Route("Gender")]
        public ActionResult<RegisterVM> GetGender()
        {
            var result = employeeRepository.GetGender();
            if (result != null)
            {
               return Ok(new { status = HttpStatusCode.OK, result = result, message = "Data berhasil ditampilkan" });
               //return Ok(result);
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.NotFound, result = result, message = "Tidak ada data di sini" });
            }
        }

        [HttpGet]
        [Route("Role")]
        public ActionResult<RegisterVM> GetRole()
        {
            var result = employeeRepository.GetRole();
            if (result != null)
            {
                return Ok(new { status = HttpStatusCode.OK, result = result, message = "Data berhasil ditampilkan" });
                //return Ok(result);
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.NotFound, result = result, message = "Tidak ada data di sini" });
            }
        }

        [HttpGet]
        [Route("Degree")]
        public ActionResult<RegisterVM> GetDegree()
        {
            var result = employeeRepository.GetDegree();
            if (result != null)
            {
                return Ok(new { status = HttpStatusCode.OK, result = result, message = "Data berhasil ditampilkan" });
                //return Ok(result);
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.NotFound, result = result, message = "Tidak ada data di sini" });
            }
        }

        [HttpGet]
        [Route("Salary")]
        public ActionResult<RegisterVM> GetSalary()
        {
            var result = employeeRepository.GetSalary();
            if (result != null)
            {
                return Ok(new { status = HttpStatusCode.OK, result = result, message = "Data berhasil ditampilkan" });
                //return Ok(result);
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.NotFound, result = result, message = "Tidak ada data di sini" });
            }
        }


        [Authorize(Roles = "Director")]
        [Route("SignManager")]
        [HttpPost]
        public ActionResult SignManager(AccountRole accountRole)
        {
            var result = employeeRepository.SignManager(accountRole);
            if(result == 1)
            {
                return Ok(new { status = HttpStatusCode.OK, result = result, message = "Data berhasil Di UPDATE!!!" });
                //return Ok(result);
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.OK, result = result, message = "Data tidak berhasil Di UPDATE!!!" });
            }
        }
    }
}