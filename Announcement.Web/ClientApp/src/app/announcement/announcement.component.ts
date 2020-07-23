import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../services/announcement.service';
import { Announcement } from '../models/announcement';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  announcementList : Announcement[] = []

  
  isLoaded: Promise<boolean>;
  constructor(
    private announcementService : AnnouncementService
  ) { }

  ngOnInit() {
    this.getAllAnnoucement();
  }

  getAllAnnoucement(){
    this.announcementService.getAllAnnouncements()
      .subscribe((data:Announcement[])=> this.announcementList = data)
      this.isLoaded = Promise.resolve(true)

  }

}
