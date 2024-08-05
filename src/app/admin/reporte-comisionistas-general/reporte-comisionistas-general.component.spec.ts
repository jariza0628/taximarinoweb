import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteComisionistasGeneralComponent } from './reporte-comisionistas-general.component';

describe('ReporteComisionistasGeneralComponent', () => {
  let component: ReporteComisionistasGeneralComponent;
  let fixture: ComponentFixture<ReporteComisionistasGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteComisionistasGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteComisionistasGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
