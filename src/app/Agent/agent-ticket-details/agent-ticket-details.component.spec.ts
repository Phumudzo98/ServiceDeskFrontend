import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentTicketDetailsComponent } from './agent-ticket-details.component';

describe('AgentTicketDetailsComponent', () => {
  let component: AgentTicketDetailsComponent;
  let fixture: ComponentFixture<AgentTicketDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentTicketDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentTicketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
