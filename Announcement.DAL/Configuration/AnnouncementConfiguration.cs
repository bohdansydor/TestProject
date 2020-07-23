using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Announcement.DAL.Entities;

namespace Announcement.DAL.Configuration
{
    internal class AnnouncementConfiguration : IEntityTypeConfiguration<AnnouncementEntity>
    {
         
        public void Configure(EntityTypeBuilder<AnnouncementEntity> builder)
        {
            builder.ToTable("Announcement");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).ValueGeneratedOnAdd();
            builder.Property(x => x.Title).IsRequired();
            builder.Property(x => x.Description).IsRequired();
            builder.Property(x => x.DateAdded).HasDefaultValueSql("GETDATE()");
        }

    }
}
