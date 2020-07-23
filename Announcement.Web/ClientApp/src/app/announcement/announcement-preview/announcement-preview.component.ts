import { Component, OnInit, Input } from '@angular/core';
import { Announcement } from 'src/app/models/announcement';

@Component({
  selector: 'app-announcement-preview',
  templateUrl: './announcement-preview.component.html',
  styleUrls: ['./announcement-preview.component.css']
})
export class AnnouncementPreviewComponent implements OnInit {
  
  @Input() announcement:Announcement;
  constructor() { }

  ngOnInit() {
  }

}
