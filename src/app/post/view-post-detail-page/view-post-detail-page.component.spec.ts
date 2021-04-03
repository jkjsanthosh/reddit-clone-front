import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPostDetailPageComponent } from './view-post-detail-page.component';

describe('ViewPostDetailPageComponent', () => {
  let component: ViewPostDetailPageComponent;
  let fixture: ComponentFixture<ViewPostDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPostDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPostDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
