import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarAnnouncementComponent } from './similar-announcement.component';

describe('SimilarAnnouncementComponent', () => {
  let component: SimilarAnnouncementComponent;
  let fixture: ComponentFixture<SimilarAnnouncementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimilarAnnouncementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
