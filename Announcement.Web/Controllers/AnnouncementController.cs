using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Announcement.BLL.DTO;
using Announcement.BLL.Interfaces;
using Announcement.Web.ViewModel;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Announcement.Web.Controllers
{
    [Route("api/announcement")]
    [ApiController]
    public class AnnouncementController : ControllerBase
    {
        private readonly IAnnouncementService _announcementService;

        public AnnouncementController(IAnnouncementService announcementService)
        {
            _announcementService = announcementService;
        }

        // GET: api/announcement/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<AnnouncementDto, AnnouncementViewModel>())
                .CreateMapper();

            var announcementDto = await _announcementService.GetAnnouncementById(id);

            var announcementModel = mapper.Map<AnnouncementViewModel>(announcementDto);

            return Ok(announcementModel);
        }

        // POST: api/announcement
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] AnnouncementViewModel announcementModel)
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<AnnouncementViewModel, AnnouncementDto>())
                .CreateMapper();

            var announcementDto = mapper.Map<AnnouncementDto>(announcementModel);

            await _announcementService.AddAnnouncementAsync(announcementDto);
            return Ok();


        }

        // PUT: api/announcement/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, [FromForm] AnnouncementViewModel announcementModel)
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<AnnouncementViewModel, AnnouncementDto>()).CreateMapper();

            var announcementDto = mapper.Map<AnnouncementDto>(announcementModel);

            await _announcementService.UpdateAnnouncementAsync(id, announcementDto);

            return Ok();
        }
        // GET: api/announcement/all
        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<AnnouncementDto, AnnouncementViewModel>())
                .CreateMapper();

            var announcementDtos = await _announcementService.GetAnnouncementsAsync();

            var announcementModels = mapper.Map<List<AnnouncementViewModel>>(announcementDtos);
            return Ok(announcementModels);
        }
        // DELETE: api/announcement/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {            
            await _announcementService.DeleteAnnouncementAsync(id);
            return Ok();
        }
        // GET: api/announcement/top3/9
        [HttpGet("top3/{id}")]
        public async Task<IActionResult> GetTopThreeAll(int id)
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<AnnouncementDto, AnnouncementViewModel>())
                .CreateMapper();

            var announcementDtos = await _announcementService.GetTopThreeSimilarAnnouncementsAsync(id);

            var announcementModels = mapper.Map<List<AnnouncementViewModel>>(announcementDtos);
            return Ok(announcementModels);
        }

    }
}