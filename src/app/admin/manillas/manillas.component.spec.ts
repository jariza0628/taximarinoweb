import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManillasComponent } from './manillas.component';

describe('ManillasComponent', () => {
  let component: ManillasComponent;
  let fixture: ComponentFixture<ManillasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManillasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManillasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
