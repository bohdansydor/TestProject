import { Component, OnInit, Input } from '@angular/core';
import { Announcement } from 'src/app/models/announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-similar-announcement',
  templateUrl: './similar-announcement.component.html',
  styleUrls: ['./similar-announcement.component.css']
})
export class SimilarAnnouncementComponent implements OnInit {
  @Input() id: number;
  mode:boolean
  similarAnnouncements: Announcement[];
  isLoaded: Promise<boolean>;
  constructor(
    private announcementService: AnnouncementService
  ) { }

  ngOnInit() {
    this.getSimilarAnnouncements(this.id);
  }
  toggle() {
    this.mode = !this.mode;
    if(this.mode === true){
      this.getSimilarAnnouncements(this.id);
    }
  }
  getSimilarAnnouncements(id:number){
    this.announcementService.getTopThreeSimilarAnnouncement(id).subscribe((data: Announcement[]) => {
      this.similarAnnouncements = data;
      this.isLoaded = Promise.resolve(true)
    });
  }
}


