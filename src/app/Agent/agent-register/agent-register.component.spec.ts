import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentRegisterComponent } from './agent-register.component';

describe('AgentRegisterComponent', () => {
  let component: AgentRegisterComponent;
  let fixture: ComponentFixture<AgentRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
