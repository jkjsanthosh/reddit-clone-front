import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubredditListPageComponent } from './subreddit-list-page.component';

describe('SubredditListPageComponent', () => {
  let component: SubredditListPageComponent;
  let fixture: ComponentFixture<SubredditListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubredditListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubredditListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
