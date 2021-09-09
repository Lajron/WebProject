using Microsoft.EntityFrameworkCore;

namespace backend.Models 
{
    public class ParkingContext: DbContext {

        public DbSet<City> Cities { get; set; }
        public DbSet<Street> Streets { get; set; }
        public DbSet<User> Users { get; set; }

        public ParkingContext(DbContextOptions options): base(options) {

            
        }
    }
}