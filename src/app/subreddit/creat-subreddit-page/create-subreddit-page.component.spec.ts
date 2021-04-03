import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubredditPageComponent } from './create-subreddit-page.component';

describe('CreateSubredditPageComponent', () => {
  let component: CreateSubredditPageComponent;
  let fixture: ComponentFixture<CreateSubredditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSubredditPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubredditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
