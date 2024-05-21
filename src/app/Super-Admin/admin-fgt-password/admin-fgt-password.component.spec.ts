import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFgtPasswordComponent } from './admin-fgt-password.component';

describe('AdminFgtPasswordComponent', () => {
  let component: AdminFgtPasswordComponent;
  let fixture: ComponentFixture<AdminFgtPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFgtPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFgtPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
