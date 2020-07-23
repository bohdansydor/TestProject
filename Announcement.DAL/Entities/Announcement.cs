using System;

namespace Announcement.DAL.Entities
{
    public class AnnouncementEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
    }
}
