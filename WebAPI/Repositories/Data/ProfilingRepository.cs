using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Base.Urls;

namespace WebAPI.Repositories.Data
{
    public class ProfilingRepository : GeneralRepository<Profiling, string>
    {
        public ProfilingRepository(Address address, string request = "Profiling/") : base(address, request)
        {

        }
    }
}
