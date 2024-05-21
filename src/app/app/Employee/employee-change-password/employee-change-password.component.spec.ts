import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeChangePasswordComponent } from './employee-change-password.component';

describe('EmployeeChangePasswordComponent', () => {
  let component: EmployeeChangePasswordComponent;
  let fixture: ComponentFixture<EmployeeChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeChangePasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
