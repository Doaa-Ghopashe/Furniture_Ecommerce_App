import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideRawComponent } from './slide-raw.component';

describe('SlideRawComponent', () => {
  let component: SlideRawComponent;
  let fixture: ComponentFixture<SlideRawComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlideRawComponent]
    });
    fixture = TestBed.createComponent(SlideRawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
