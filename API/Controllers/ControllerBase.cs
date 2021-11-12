using API.Repository.Data;

namespace API.Controllers
{
    public class ControllerBase<T1, T2, T3>
    {
        private UniversityRepository universityRepository;
        private ProfilingRepository profilingRepository;
        private AccountRepository educationRepository;
        private EducationRepository educationRepository1;
        private EmployeeRepository employeeRepository;

        public ControllerBase(UniversityRepository universityRepository)
        {
            this.universityRepository = universityRepository;
        }

        public ControllerBase(ProfilingRepository profilingRepository)
        {
            this.profilingRepository = profilingRepository;
        }

        public ControllerBase(AccountRepository accountRepository)
        {
            this.educationRepository = accountRepository;
        }

        public ControllerBase(EducationRepository educationRepository1)
        {
            this.educationRepository1 = educationRepository1;
        }

        public ControllerBase(EmployeeRepository employeeRepository)
        {
            this.employeeRepository = employeeRepository;
        }
    }
}