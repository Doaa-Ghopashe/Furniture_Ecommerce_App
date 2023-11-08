import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductsCategoriesComponent } from './list-products-categories.component';

describe('ListProductsCategoriesComponent', () => {
  let component: ListProductsCategoriesComponent;
  let fixture: ComponentFixture<ListProductsCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProductsCategoriesComponent]
    });
    fixture = TestBed.createComponent(ListProductsCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
