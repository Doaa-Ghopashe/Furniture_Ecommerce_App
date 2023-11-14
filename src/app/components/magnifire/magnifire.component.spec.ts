import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagnifireComponent } from './magnifire.component';

describe('MagnifireComponent', () => {
  let component: MagnifireComponent;
  let fixture: ComponentFixture<MagnifireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MagnifireComponent]
    });
    fixture = TestBed.createComponent(MagnifireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
