import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTopMenuComponent } from './employee-top-menu.component';

describe('EmployeeTopMenuComponent', () => {
  let component: EmployeeTopMenuComponent;
  let fixture: ComponentFixture<EmployeeTopMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTopMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeTopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
