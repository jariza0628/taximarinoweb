import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointSaleComponent } from './point-sale.component';

describe('PointSaleComponent', () => {
  let component: PointSaleComponent;
  let fixture: ComponentFixture<PointSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
