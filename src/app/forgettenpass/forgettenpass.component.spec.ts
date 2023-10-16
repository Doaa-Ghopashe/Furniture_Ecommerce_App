import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgettenpassComponent } from './forgettenpass.component';

describe('ForgettenpassComponent', () => {
  let component: ForgettenpassComponent;
  let fixture: ComponentFixture<ForgettenpassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgettenpassComponent]
    });
    fixture = TestBed.createComponent(ForgettenpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
