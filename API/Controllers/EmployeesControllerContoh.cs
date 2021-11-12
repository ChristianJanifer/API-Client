/*using API.Models;
using API.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("API/[controller]")]
    [ApiController]

    public class EmployeesControllerContoh : ControllerBase
    {
        private readonly IRepository employeeRepository;

        public EmployeesControllerContoh(IRepository employeeRepository)
        {
            this.employeeRepository = employeeRepository;
        }

        [HttpPost]
        public ActionResult Post(Employee employee)
        {
            var result = employeeRepository.Insert(employee);
            if (result == 2)
            {
                return Ok(new { status = HttpStatusCode.OK, result = result, message = "Data Gagal Dimasukan, NIK SUDAH TERDAFTAR" });
            }
            else if (result == 3)
            {
                return Ok(new { status = HttpStatusCode.OK, result = result, message = "Data Gagal Dimasukan, PHONE SUDAH TERDAFTAR" });
            }
            else if (result == 4)
            {
                return Ok(new { status = HttpStatusCode.OK, result = result, message = "Data Gagal Dimasukan, EMAIL SUDAH TERDAFTAR" });
            }
            return Ok(new { status = HttpStatusCode.OK, result = result, message = "Data Berhasil Ditambahkan" });
        }

        [HttpGet]
        public IEnumerable<Employee> GetEmployees()
        {
            return employeeRepository.Get();
        }

        [HttpGet("{NIK}")]
        public ActionResult Get(string NIK)
        {
            var ada = employeeRepository.Get(NIK);
            if (ada != null)
            {
                return Ok(new { status = HttpStatusCode.OK, result = ada, message = "Data berhasil ditampilkan" });
            }
            return NotFound(new { status = HttpStatusCode.NotFound, result = ada, message = $"Data dengan NIK {NIK} tidak ditemukan" });
        }

        [HttpDelete("{NIK}")]
        public ActionResult Delete(string NIK)
        {
            var exist = employeeRepository.Get(NIK);
            try
            {
                var result = employeeRepository.Delete(exist.NIK);
                return Ok(new { status = HttpStatusCode.OK, result = result, message = "Data berhasil dihapus" });
            }
            catch (NullReferenceException)
            {
                return NotFound(new { status = HttpStatusCode.NotFound, result = exist, message = $"Data dengan NIK {NIK} tidak ditemukan" });
            }
        }

        [HttpPut("{NIK}")]
        public ActionResult Update(Employee employee, string NIK)
        {
            try
            {
                var result = employeeRepository.Update(employee);
                return Ok(new { status = HttpStatusCode.OK, message = $"Data dengan NIK {employee.NIK} berhasil diupdate" });
            }
            catch
            {
                return NotFound(new { status = HttpStatusCode.NotFound, message = "Data dengan NIK tersebut tidak ditemukan" });
            }
        }
    }
}
*/