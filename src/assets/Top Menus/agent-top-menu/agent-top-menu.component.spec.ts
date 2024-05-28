import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentTopMenuComponent } from './agent-top-menu.component';

describe('AgentTopMenuComponent', () => {
  let component: AgentTopMenuComponent;
  let fixture: ComponentFixture<AgentTopMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentTopMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentTopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
