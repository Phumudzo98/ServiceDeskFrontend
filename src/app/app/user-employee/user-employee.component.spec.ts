import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEmployeeComponent } from './user-employee.component';

describe('UserEmployeeComponent', () => {
  let component: UserEmployeeComponent;
  let fixture: ComponentFixture<UserEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
