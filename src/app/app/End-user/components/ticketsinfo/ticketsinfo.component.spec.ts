import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsinfoComponent } from './ticketsinfo.component';

describe('TicketsinfoComponent', () => {
  let component: TicketsinfoComponent;
  let fixture: ComponentFixture<TicketsinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
