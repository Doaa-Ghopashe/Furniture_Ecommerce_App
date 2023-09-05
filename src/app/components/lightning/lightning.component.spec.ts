import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightningComponent } from './lightning.component';

describe('LightningComponent', () => {
  let component: LightningComponent;
  let fixture: ComponentFixture<LightningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LightningComponent]
    });
    fixture = TestBed.createComponent(LightningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
