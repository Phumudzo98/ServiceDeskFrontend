import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoTicketsComponent } from './no-tickets.component';

describe('NoTicketsComponent', () => {
  let component: NoTicketsComponent;
  let fixture: ComponentFixture<NoTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoTicketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
