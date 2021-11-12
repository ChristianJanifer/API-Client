using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Base.Urls;

namespace WebAPI.Repositories.Data
{
    public class AccountRepository : GeneralRepository<Account, string>
    {
        public AccountRepository(Address address, string request = "Accounts/") : base(address, request)
        {

        }
    }
}
