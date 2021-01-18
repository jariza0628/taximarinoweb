import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodebarNoveltiesComponent } from './codebar-novelties.component';

describe('CodebarNoveltiesComponent', () => {
  let component: CodebarNoveltiesComponent;
  let fixture: ComponentFixture<CodebarNoveltiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodebarNoveltiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodebarNoveltiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
