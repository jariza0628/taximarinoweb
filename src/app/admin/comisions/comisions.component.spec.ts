import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionsComponent } from './comisions.component';

describe('ComisionsComponent', () => {
  let component: ComisionsComponent;
  let fixture: ComponentFixture<ComisionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComisionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
