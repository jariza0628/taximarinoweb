import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSalesAuditoriaComponent } from './report-sales-auditoria.component';

describe('ReportSalesAuditoriaComponent', () => {
  let component: ReportSalesAuditoriaComponent;
  let fixture: ComponentFixture<ReportSalesAuditoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSalesAuditoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSalesAuditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
