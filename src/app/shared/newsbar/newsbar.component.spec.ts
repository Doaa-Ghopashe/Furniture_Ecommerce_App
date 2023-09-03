import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsbarComponent } from './newsbar.component';

describe('NewsbarComponent', () => {
  let component: NewsbarComponent;
  let fixture: ComponentFixture<NewsbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsbarComponent]
    });
    fixture = TestBed.createComponent(NewsbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
