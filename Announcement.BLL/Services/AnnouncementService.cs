using Announcement.BLL.DTO;
using Announcement.BLL.Interfaces;
using Announcement.DAL.Entities;
using Announcement.DAL.UnitOfWork;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Announcement.BLL.Services
{
    public class AnnouncementService : IAnnouncementService
    {
        private readonly IUnitOfWork _unitOfWork;

        public AnnouncementService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<AnnouncementDto>> GetAnnouncementsAsync()
        {
            var announcements = await _unitOfWork.Repository<AnnouncementEntity>().GetAllAsync();

            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<AnnouncementEntity, AnnouncementDto>()).CreateMapper();
            var announcementsDto = mapper.Map<IEnumerable<AnnouncementEntity>, IEnumerable<AnnouncementDto>>(announcements);

            return announcementsDto;
        }

        public async Task DeleteAnnouncementAsync(int id)
        {
            var announcement = await _unitOfWork.Repository<AnnouncementEntity>().Get(x => x.Id == id);
            if (announcement == null)
            {
                throw new ArgumentNullException(
                    $"Announcements with {nameof(id)}={id} not found");
            }

            _unitOfWork.Repository<AnnouncementEntity>().Remove(announcement);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task AddAnnouncementAsync(AnnouncementDto announcementDto)
        {

            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<AnnouncementDto, AnnouncementEntity>()).CreateMapper();

            var announcement = mapper.Map<AnnouncementDto, AnnouncementEntity>(announcementDto);

            _unitOfWork.Repository<AnnouncementEntity>().Add(announcement);
            await _unitOfWork.SaveChangesAsync();
        }
        public async Task UpdateAnnouncementAsync(int id, AnnouncementDto announcementDto)
        {

            var announcement = await _unitOfWork.Repository<AnnouncementEntity>().Get(p => p.Id == id);
            if (announcement == null)
            {
                throw new ArgumentNullException(
                    $"Error while updating Announcement. Announcement with id {nameof(id)}={id} not found");
            }

            announcement.Title = announcementDto.Title;
            announcement.Description = announcementDto.Description;

            _unitOfWork.Repository<AnnouncementEntity>().Update(announcement);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<AnnouncementDto> GetAnnouncementById(int id)
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<AnnouncementEntity, AnnouncementDto>()).CreateMapper();

            var announcement = await _unitOfWork.Repository<AnnouncementEntity>().Get(d => d.Id == id) ??
                           throw new ArgumentNullException($"Announcement with id {nameof(id)}={id} not found");
            var announcementDto = mapper.Map<AnnouncementEntity, AnnouncementDto>(announcement);

            return announcementDto;

        }

        public async Task<IEnumerable<AnnouncementDto>> GetTopThreeSimilarAnnouncementsAsync(int id)
        {
            var mapperConfig = new MapperConfiguration(cfg => cfg.CreateMap<AnnouncementEntity, AnnouncementDto>());

            var announcement = await GetAnnouncementById(id);
            var text = announcement.Title + " " + announcement.Description;
            var words = splitText(text);

            var announcementsDto = await GetAnnouncementsAsync();

            announcementsDto = announcementsDto
               .Where(x => x.Id != announcement.Id)
               .Where(x => isSimilar(words, splitText(x.Title + " " + x.Description)))
               .OrderByDescending(x => CalculateSimilarity(text, x.Title + " " + x.Description))
               .Take(3);
            if (announcementsDto == null)
            {
                throw new ArgumentNullException("Similar announcement not found");
            }


            return announcementsDto;

        }

        private bool isSimilar(string[] sourse, string[] target)
        {
            for (int i = 0; i < sourse.Count(); i++)
            {
                for (int j = 0; j < target.Count(); j++)
                {
                    if (sourse[i] == target[j])
                        return true;
                }
            }
            return false;
        }
        private string[] splitText(string text)
        {
            var punctuation = text.Where(Char.IsPunctuation).Distinct().ToArray();
            var words = text.ToLower().Split().Select(x => x.Trim(punctuation)).ToArray();
            return words;

        }
        int ComputeLevenshteinDistance(string source, string target)
        {
            if ((source == null) || (target == null)) return 0;
            if ((source.Length == 0) || (target.Length == 0)) return 0;
            if (source == target) return source.Length;

            int sourceWordCount = source.Length;
            int targetWordCount = target.Length;

            if (sourceWordCount == 0)
                return targetWordCount;

            if (targetWordCount == 0)
                return sourceWordCount;

            int[,] distance = new int[sourceWordCount + 1, targetWordCount + 1];

            for (int i = 0; i <= sourceWordCount; distance[i, 0] = i++) ;
            for (int j = 0; j <= targetWordCount; distance[0, j] = j++) ;

            for (int i = 1; i <= sourceWordCount; i++)
            {
                for (int j = 1; j <= targetWordCount; j++)
                {
                    int cost = (target[j - 1] == source[i - 1]) ? 0 : 1;

                    distance[i, j] = Math.Min(Math.Min(distance[i - 1, j] + 1, distance[i, j - 1] + 1), distance[i - 1, j - 1] + cost);
                }
            }

            return distance[sourceWordCount, targetWordCount];
        }
        double CalculateSimilarity(string source, string target)
        {
            if ((source == null) || (target == null)) return 0.0;
            if ((source.Length == 0) || (target.Length == 0)) return 0.0;
            if (source == target) return 1.0;

            int stepsToSame = ComputeLevenshteinDistance(source, target);
            return (1.0 - ((double)stepsToSame / (double)Math.Max(source.Length, target.Length)));
        }
    }
}
