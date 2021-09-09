using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ParkingController : ControllerBase
    {
        public ParkingContext Context { get; set; } 
        public ParkingController(ParkingContext context) {
            Context = context;    
        }

        [Route("GetCities")]
        [HttpGet]
        public async Task<List<City>> GetCities() {
            return await Context.Cities.Include( ph => ph.Streets).ThenInclude( ph => ph.Users).ToListAsync();
        }

        [Route("AddCity")]
        [HttpPost]
        public async Task<City> AddCity([FromBody] City obj) {
            Context.Cities.Add(obj);
            await Context.SaveChangesAsync();
            return obj;
        }

        [Route("AddStreet/{cityID}")]
        [HttpPost]
        public async Task<Street> AddStreet(int cityID, [FromBody] Street obj) {
            var city = await Context.Cities.FindAsync(cityID);
            obj.City = city;
            Context.Streets.Add(obj);
            await Context.SaveChangesAsync();
            return obj;
        }

        [Route("AddUser/{streetID}")]
        [HttpPost]
        public async Task<User> AddUser(int streetID, [FromBody] User obj) {
            var street = await Context.Streets.FindAsync(streetID);
            obj.Street = street;
            Context.Users.Add(obj);
            await Context.SaveChangesAsync();
            return obj;
        }

        [Route("UpdateUser")]
        [HttpPut]
        public async Task UpdateUser([FromBody] User obj) {
            Context.Users.Update(obj);
            await Context.SaveChangesAsync();
        }

        [Route("DeleteUser/{id}")]
        [HttpDelete]
        public async Task DeleteUser(int id) {
            var user = await Context.Users.FindAsync(id);
            Context.Remove(user);
            await Context.SaveChangesAsync();
        }
    }
}
