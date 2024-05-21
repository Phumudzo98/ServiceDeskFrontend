import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalatedGraphComponent } from './escalated-graph.component';

describe('EscalatedGraphComponent', () => {
  let component: EscalatedGraphComponent;
  let fixture: ComponentFixture<EscalatedGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscalatedGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscalatedGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
