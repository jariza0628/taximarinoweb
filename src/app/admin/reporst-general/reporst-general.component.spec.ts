import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporstGeneralComponent } from './reporst-general.component';

describe('ReporstGeneralComponent', () => {
  let component: ReporstGeneralComponent;
  let fixture: ComponentFixture<ReporstGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporstGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporstGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
