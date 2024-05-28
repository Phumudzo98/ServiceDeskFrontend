import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentForgotPasswordComponent } from './agent-forgot-password.component';

describe('AgentForgotPasswordComponent', () => {
  let component: AgentForgotPasswordComponent;
  let fixture: ComponentFixture<AgentForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentForgotPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
