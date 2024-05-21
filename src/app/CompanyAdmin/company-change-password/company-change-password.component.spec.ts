import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyChangePasswordComponent } from './company-change-password.component';

describe('CompanyChangePasswordComponent', () => {
  let component: CompanyChangePasswordComponent;
  let fixture: ComponentFixture<CompanyChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyChangePasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
