using Announcement.DAL.Configuration;
using Announcement.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace Announcement.DAL
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions options) : base(options)
        {

        }
        public virtual DbSet<AnnouncementEntity> Announcement{ get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new AnnouncementConfiguration());
        }
    }
}
