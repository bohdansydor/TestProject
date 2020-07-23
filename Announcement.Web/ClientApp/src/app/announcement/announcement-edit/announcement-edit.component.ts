import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Announcement } from 'src/app/models/announcement';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-announcement-edit',
  templateUrl: './announcement-edit.component.html',
  styleUrls: ['./announcement-edit.component.css']
})
export class AnnouncementEditComponent implements OnInit {

  public editForm: FormGroup;
  id:number;
  announcement: Announcement;
  constructor(
    private route: ActivatedRoute,
    private announcementService: AnnouncementService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.editForm = new FormGroup({
      "title":new FormControl("",[Validators.required,Validators.maxLength(250), Validators.minLength(3)]),
      "description":new FormControl("", [Validators.required,Validators.maxLength(10000), Validators.minLength(5)])
    });
   }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.announcementService.getAnnouncementById(this.id).subscribe((data: Announcement) => {
      this.announcement = data;
      this.editForm.controls["title"].setValue(this.announcement.title)      
      this.editForm.controls["description"].setValue(this.announcement.description)  
    })   
  }
  onSubmit() {
    if (this.editForm.invalid) {
      const controls = this.editForm.controls;
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    else {
      const formData = new FormData();
      const editAnnouncement = this.editForm.value as Announcement;
      formData.append("title", editAnnouncement.title);
      formData.append("description", editAnnouncement.description);
      this.announcementService.editAnnouncement(this.id,formData).subscribe(
        async (msg: string) => {
          msg = "Edited successfully"
          this.notificationService.success(msg);
          this.router.navigateByUrl(`/details/${this.id}`);
        },
        async error => {
          console.log(error);
          this.notificationService.warn("Something went wrong...");
        })
      this.router.navigate([`/details/${this.id}`]);
    }
  }

}
