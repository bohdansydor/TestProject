import { Component, OnInit } from '@angular/core';
import { Announcement } from 'src/app/models/announcement';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AnnouncementComponent } from '../announcement.component';

@Component({
  selector: 'app-announcement-details',
  templateUrl: './announcement-details.component.html',
  styleUrls: ['./announcement-details.component.css']
})
export class AnnouncementDetailsComponent implements OnInit {

  id: number;
  announcement: Announcement;
  announcementList: Announcement[];
  similarAnnouncements: Announcement[];



  constructor(
    private route: ActivatedRoute,
    private announcementService: AnnouncementService,
    private notificationService: NotificationService,
    private router: Router) {
  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.getAnnouncementById(this.id);
  }

  getAnnouncementById(id: number) {
    this.announcementService.getAnnouncementById(id).subscribe((data: Announcement) => {
      this.announcement = data;
    });
  }

  async onDelete(id: number) {
    this.announcementService.deleteAnnouncement(id).subscribe(result => {
      this.announcementService
        .getAllAnnouncements()
        .subscribe(async (announcementList: Announcement[]) => {
          this.announcementList = announcementList;
          this.notificationService.success("Deleted successfully!");
          await this.router.navigateByUrl("/");
        });
    });
  };
 

}
