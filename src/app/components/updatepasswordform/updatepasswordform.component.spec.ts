import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepasswordformComponent } from './updatepasswordform.component';

describe('ResetpasswordComponent', () => {
  let component: UpdatepasswordformComponent;
  let fixture: ComponentFixture<UpdatepasswordformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatepasswordformComponent]
    });
    fixture = TestBed.createComponent(UpdatepasswordformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
