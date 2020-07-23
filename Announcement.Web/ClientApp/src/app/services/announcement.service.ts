import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Announcement } from '../models/announcement';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
 

  constructor(private http: HttpClient) { }
  private baseUrl = "api/";

  getAllAnnouncements(){
    return this.http.get(`${this.baseUrl}announcement/all`);
  }

  getAnnouncementById(id: number){
    return this.http.get(`${this.baseUrl}announcement/${id}`);
  }

  createAnnouncement(announcement){
    return this.http.post(`${this.baseUrl}announcement`,announcement);
  }

  deleteAnnouncement(id:number){
    return this.http.delete(`${this.baseUrl}announcement/${id}`);
  }

  editAnnouncement(id:number,announcement){
    return this.http.put(`${this.baseUrl}announcement/${id}`,announcement);
  }
  getTopThreeSimilarAnnouncement(id:number){
    return this.http.get(`${this.baseUrl}announcement/top3/${id}`)
  }
  
}
