using Announcement.BLL.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Announcement.BLL.Interfaces
{
    public interface IAnnouncementService
    {
        Task<IEnumerable<AnnouncementDto>> GetAnnouncementsAsync();
        Task DeleteAnnouncementAsync(int id);
        Task AddAnnouncementAsync(AnnouncementDto announcementDto);
        Task UpdateAnnouncementAsync(int id, AnnouncementDto announcementDto);
        Task<AnnouncementDto> GetAnnouncementById(int id);
        Task<IEnumerable<AnnouncementDto>> GetTopThreeSimilarAnnouncementsAsync(int id);


    }
}
