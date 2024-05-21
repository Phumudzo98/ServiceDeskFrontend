import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeForgortPasswordComponent } from './employee-forgort-password.component';

describe('EmployeeForgortPasswordComponent', () => {
  let component: EmployeeForgortPasswordComponent;
  let fixture: ComponentFixture<EmployeeForgortPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeForgortPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeForgortPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
