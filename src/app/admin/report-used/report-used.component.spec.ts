import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportUsedComponent } from './report-used.component';

describe('ReportUsedComponent', () => {
  let component: ReportUsedComponent;
  let fixture: ComponentFixture<ReportUsedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportUsedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportUsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
