using API.Context;
using API.Models;
using API.ViewModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repository.Data
{
    public class EmployeeRepository : GeneralRepository<MyContext, Employee, string>
    {
        private readonly MyContext myContext;

        public EmployeeRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }

        private static string GetRandomSalt()
        {
            return BCrypt.Net.BCrypt.GenerateSalt(12); 
        }

        public int Register(RegisterVM registerVM)
        {
            Employee employee = new Employee();
            Account account = new Account();
            Profiling profiling = new Profiling();
            Education education = new Education();
            University university = new University();
            AccountRole accountRole = new AccountRole();

            var checkdata = myContext.Employees.Find(registerVM.NIK);
            var checkPhone = myContext.Employees.Where(employee => employee.Phone == registerVM.Phone).FirstOrDefault();
            var checkEmail = myContext.Employees.Where(employee => employee.Email == registerVM.Email).FirstOrDefault();
            var checkUniv = myContext.Universities.Where(university => university.Id == registerVM.University_Id).FirstOrDefault();

            employee.NIK = registerVM.NIK;
            if (checkdata != null)
            {
                return 2;
            }
            if (checkPhone != null)
            {
                return 3;
            }
            if (checkEmail != null)
            {
                return 4;
            }
            if (checkUniv == null)
            {
                return 5;
            }

            employee.FirstName = registerVM.FirstName;
            employee.LastName = registerVM.LastName;
            employee.Phone = registerVM.Phone;
            employee.BirthDate = registerVM.BirthDate;
            employee.Salary = registerVM.Salary;
            employee.Email = registerVM.Email;
            employee.Gender = (Models.Gender)registerVM.Gender;
            myContext.Employees.Add(employee);
            myContext.SaveChanges();

            account.NIK = employee.NIK;
            account.Password = BCrypt.Net.BCrypt.HashPassword(registerVM.Password, GetRandomSalt());
            myContext.Accounts.Add(account);
            myContext.SaveChanges();
                                         
            education.Degree = registerVM.Degree;
            education.GPA = registerVM.GPA;
            education.University_id = registerVM.University_Id;
            myContext.Educations.Add(education);
            myContext.SaveChanges();
            
            profiling.NIK = account.NIK;
            profiling.Education_Id = education.Id;
            myContext.Profilings.Add(profiling);
            var result = myContext.SaveChanges();

            accountRole.NIK = account.NIK;
            accountRole.RoleId = registerVM.RoleId;
            myContext.AccountRoles.Add(accountRole);
            myContext.SaveChanges();

            return result;        
        }

        public int Login (LoginVM loginVM)
        {
            var checkEmail = myContext.Employees.Where(x => x.Email == loginVM.Email).FirstOrDefault();

            if (checkEmail == null)
            {
                return 2;
            }

            var checkPass = myContext.Accounts.Find(checkEmail.NIK);
           
            bool validPass = BCrypt.Net.BCrypt.Verify(loginVM.Password, checkPass.Password);
            if (validPass)
            {
                return 3;
            }
            else
            {
                return 4;
            }
        }
        
        public string [] GetRole(string email)
        {
            var getData = myContext.Employees.Where(e => e.Email == email).FirstOrDefault();
            var getRole = (from acr in myContext.AccountRoles
                           join r in myContext.Roles
                           on acr.RoleId equals r.RoleId
                           select new
                           {
                               NIK = acr.NIK,
                               RoleName = r.RoleName
                           }).Where(acr => acr.NIK == getData.NIK).ToList();

            List<string> result = new List<string>();

            foreach (var item in getRole)
            {
                result.Add(item.RoleName);
            }

            return result.ToArray();
        }

        public int SignManager(AccountRole accountRole)
        {
            try
            {
                myContext.AccountRoles.Add(accountRole);
                var result = myContext.SaveChanges();
                return result;
            }
            catch
            {
                return 0;
            }
        }

        public IEnumerable<RegisterVM> GetProfile()
        {
            var query = (from e in myContext.Employees
                         join a in myContext.Accounts on e.NIK equals a.NIK
                         join p in myContext.Profilings on a.NIK equals p.NIK
                         join ed in myContext.Educations on p.Education_Id equals ed.Id
                         join u in myContext.Universities on ed.University_id equals u.Id
                         join ar in myContext.AccountRoles on a.NIK equals ar.NIK
                         join r in myContext.Roles on ar.RoleId equals r.RoleId
                         orderby e.NIK
                         select new RegisterVM
                         {
                             NIK = e.NIK,
                             FirstName = e.FirstName,
                             LastName = e.LastName,
                             Phone = e.Phone,
                             BirthDate = e.BirthDate,
                             Salary = e.Salary,
                             Email = e.Email,
                             Gender = (ViewModel.Gender)e.Gender,
                             Password = a.Password,
                             Degree = ed.Degree,
                             GPA = ed.GPA,
                             University_Id = ed.University_id,
                             RoleId = r.RoleId
                         }).ToList();
            return query;
        }

        public IEnumerable<RegisterVM> GetProfileNik(string NIK)
        {
            var query = (from e in myContext.Employees
                         join a in myContext.Accounts on e.NIK equals a.NIK
                         join p in myContext.Profilings on a.NIK equals p.NIK
                         join ed in myContext.Educations on p.Education_Id equals ed.Id
                         join u in myContext.Universities on ed.University_id equals u.Id
                         join ar in myContext.AccountRoles on a.NIK equals ar.NIK
                         join r in myContext.Roles on ar.RoleId equals r.RoleId
                         orderby e.NIK
                         select new RegisterVM
                         {
                             NIK = e.NIK,
                             FirstName = e.FirstName,
                             LastName = e.LastName,
                             Phone = e.Phone,
                             BirthDate = e.BirthDate,
                             Salary = e.Salary,
                             Email = e.Email,
                             Gender = (ViewModel.Gender)e.Gender,
                             Password = a.Password,
                             Degree = ed.Degree,
                             GPA = ed.GPA,
                             University_Id = ed.University_id,
                             RoleId = r.RoleId
                         }).Where(e => e.NIK == NIK).ToList();
            return query;
        }

        public IEnumerable GetGender()
        {
            var result = from emp in myContext.Employees
                          group emp by emp.Gender into x
                          select new
                          {
                              Gender = (ViewModel.Gender)x.Key,
                              value = x.Count()
                          };
            return result;
        }

        public IEnumerable GetRole()
        {
            var result = from emp in myContext.AccountRoles
                         group emp by emp.RoleId into x
                         select new
                         {
                             roleId = x.Key,
                             value = x.Count()
                         };
            return result;
        }

        public IEnumerable GetDegree()
        {
            var result = from emp in myContext.Educations
                         group emp by emp.Degree into x
                         select new
                         {
                             Degree = x.Key,
                             value = x.Count()
                         };
            return result;
        }

        public IEnumerable GetSalary()
        {
            var result = from emp in myContext.Employees
                         group emp by emp.Salary into x
                         select new
                         {
                             Salary = x.Key,
                             value = x.Count()
                         };
            return result;
        }
    }
}

      