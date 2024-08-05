import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientWhatsappComponent } from './client-whatsapp.component';

describe('ClientWhatsappComponent', () => {
  let component: ClientWhatsappComponent;
  let fixture: ComponentFixture<ClientWhatsappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientWhatsappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
