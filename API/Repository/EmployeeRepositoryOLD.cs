/*using API.Context;
using API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repository.Interface
{
    public class IRepository : IEmployeeRepository
    {
        private readonly MyContext context;

        public IRepository(MyContext context)
        {
            this.context = context;
        }

        public IEnumerable<Employee> Get() // Menampung semua data 
        {
            return context.Employees.ToList();
        }

        public Employee Get(string NIK)
        {
            return context.Employees.Find(NIK); //menggunakan Find untuk mencari Primary Key dari NIK
        }

        public int Insert(Employee employee)
        {
            var cekNik = context.Employees.Find(employee.NIK);
            var cekPhone = context.Employees.Where(a => a.Phone == employee.Phone).FirstOrDefault();
            var cekEmail = context.Employees.Where(b => b.Email == employee.Email).FirstOrDefault();

            if (cekNik != null)
            {
                return 2;
            }
            else if (cekPhone != null)
            {
                return 3;
            }
            else if (cekEmail != null)
            {
                return 4;
            }
            else
            {
                context.Employees.Add(employee);
                var result = context.SaveChanges();
                return result;
            }
        }

        public int Update(Employee employee)
        {
            context.Entry(employee).State = EntityState.Modified;
            var result = context.SaveChanges();
            return result;
        }

        public int Delete(string NIK)
        {
            var entity = context.Employees.Find(NIK);
            context.Remove(entity);
            var result = context.SaveChanges();
            return result;
        }
    }
}
*/