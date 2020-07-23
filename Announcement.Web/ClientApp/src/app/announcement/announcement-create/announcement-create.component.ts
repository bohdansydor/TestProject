import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { Announcement } from 'src/app/models/announcement';
import { AnnouncementComponent } from '../announcement.component';

@Component({
  selector: 'app-announcement-create',
  templateUrl: './announcement-create.component.html',
  styleUrls: ['./announcement-create.component.css']
})
export class AnnouncementCreateComponent implements OnInit {

  public announcementForm: FormGroup;
  constructor(
    private announcementService: AnnouncementService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.announcementForm = new FormGroup({
      "title": new FormControl("", [Validators.required, Validators.maxLength(250), Validators.minLength(3)]),
      "description": new FormControl("", [Validators.required, Validators.maxLength(10000), Validators.minLength(5)]),
    });
  }

  ngOnInit(): void {
  }

  initializeForm() {
    this.announcementForm.setValue({
      title: "",
      description: ""
    });
  }
  onSubmit() {
    if (this.announcementForm.invalid) {
      const controls = this.announcementForm.controls;
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    else {
      const formData = new FormData();
      const announcement = this.announcementForm.value as Announcement;
      formData.append("title", announcement.title);
      formData.append("description", announcement.description);

      this.announcementService.createAnnouncement(formData).subscribe(
        async (msg: string) => {
          msg = "Created successfully";
          this.notificationService.success(msg);
          this.router.navigateByUrl("/");
        },
        async error => {
          console.log(error);
          this.notificationService.warn("Something went wrong...");
        })
      this.router.navigate(["/create"]);
    }
  }

}
