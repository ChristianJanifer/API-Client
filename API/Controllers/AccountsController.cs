﻿using API.Base;
using API.Models;
using API.Repository.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("API/[controller]")]
    [ApiController]

    public class AccountsController : BaseController<Account, AccountRepository, string>
    {
        public AccountsController(AccountRepository accountRepository) : base(accountRepository)
        {

        }
    }
}
