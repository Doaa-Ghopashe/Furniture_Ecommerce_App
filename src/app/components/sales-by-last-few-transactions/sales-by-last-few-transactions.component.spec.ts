import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesByLastFewTransactionsComponent } from './sales-by-last-few-transactions.component';

describe('SalesByLastFewTransactionsComponent', () => {
  let component: SalesByLastFewTransactionsComponent;
  let fixture: ComponentFixture<SalesByLastFewTransactionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesByLastFewTransactionsComponent]
    });
    fixture = TestBed.createComponent(SalesByLastFewTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
