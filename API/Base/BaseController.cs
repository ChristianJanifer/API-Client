using API.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace API.Base
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class BaseController<Entity, Repository, Key> : ControllerBase
        where Entity : class
        where Repository : IRepository<Entity, Key>
    {
        private readonly Repository repository;

        public BaseController(Repository repository)
        {
            this.repository = repository;
        }


        [HttpGet]
        public ActionResult<Entity> Get()
        {
            var result = repository.Get();
            if (result.ToList().Count() == 0)
            {
                return NotFound(new { status = HttpStatusCode.NotFound, result = result, message = $"Data Belum Ada" });
            }
            //return Ok(new { status = HttpStatusCode.OK, result = ada, message = $"Data berhasil ditampilkan" });
            return Ok(result);
        }

        [HttpGet("{Key}")]
        public ActionResult<Entity> Get(Key key)
        {
            var result = repository.Get(key);
            if (result != null)
            {
                //return Ok(new { status = HttpStatusCode.OK, result = ada, message = $"Data berhasil ditampilkan dengan Nik : {key}" });
                return Ok(result);
            }
            return NotFound(new { status = HttpStatusCode.NotFound, result = result, message = $"Data dengan NIK {key} tidak ditemukan" });
        }

        [HttpPost]
        public ActionResult Post(Entity entity)
        {
            var result = repository.Insert(entity);
            //return Ok(new { status = HttpStatusCode.OK, result = result, message = "Data Berhasil Ditambahkan" });
            return Ok(result);
        }

        [HttpDelete("{Key}")]
        public ActionResult<Entity> Delete(Key key)
        {
            var exist = repository.Get(key);
            try
            {
                var result = repository.Delete(key);
                return Ok(new { status = HttpStatusCode.OK, result = result, message = $"Data dengan Nik : {key} berhasil dihapus" });
            }
            catch
            {
                return NotFound(new { status = HttpStatusCode.NotFound, result = exist, message = $"Data dengan NIK {key} tidak ditemukan" });
            }
        }

        [HttpPut("{Key}")]
        public ActionResult<Entity> Update(Entity entity, Key key)
        {
            try
            {
                var result = repository.Update(entity, key);
                return Ok(new { status = HttpStatusCode.OK, message = $"Data  berhasil diupdate" });
            }
            catch
            {
                return NotFound(new { status = HttpStatusCode.NotFound, message = $"Data dengan NIK {key} tersebut tidak ditemukan" });
            }
        }
    }
}


