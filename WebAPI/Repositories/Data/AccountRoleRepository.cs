using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Base.Urls;

namespace WebAPI.Repositories.Data
{
    public class AccountRoleRepository : GeneralRepository<AccountRole, string>
    {
        public AccountRoleRepository(Address address, string request = "AccountRoles/") : base(address, request)
        {

        }
    }
}
