import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTicketDetailsComponent } from './company-ticket-details.component';

describe('CompanyTicketDetailsComponent', () => {
  let component: CompanyTicketDetailsComponent;
  let fixture: ComponentFixture<CompanyTicketDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyTicketDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyTicketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
