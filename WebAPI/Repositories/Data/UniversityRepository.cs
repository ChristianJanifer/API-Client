using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Base.Urls;

namespace WebAPI.Repositories.Data
{
    public class UniversityRepository : GeneralRepository<University, int>
    {
        public UniversityRepository(Address address, string request = "Universities/") : base(address, request)
        {

        }
    }
}
