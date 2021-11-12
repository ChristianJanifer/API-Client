using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Base.Urls;

namespace WebAPI.Repositories.Data
{
    public class EducationRepository : GeneralRepository<Education, int>
    {
        public EducationRepository(Address address, string request = "Educations/") : base(address, request)
        {

        }
    }
}
