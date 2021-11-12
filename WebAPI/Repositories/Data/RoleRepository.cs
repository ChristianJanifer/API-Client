using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Base.Urls;

namespace WebAPI.Repositories.Data
{
    public class RoleRepository : GeneralRepository<Role, int>
    {
        public RoleRepository(Address address, string request = "Roles/") : base(address, request)
        {

        }
    }
}
