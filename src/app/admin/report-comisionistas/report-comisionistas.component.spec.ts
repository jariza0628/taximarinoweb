import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportComisionistasComponent } from './report-comisionistas.component';

describe('ReportComisionistasComponent', () => {
  let component: ReportComisionistasComponent;
  let fixture: ComponentFixture<ReportComisionistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportComisionistasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportComisionistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
