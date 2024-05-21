import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFgtPasswordComponent } from './company-fgt-password.component';

describe('CompanyFgtPasswordComponent', () => {
  let component: CompanyFgtPasswordComponent;
  let fixture: ComponentFixture<CompanyFgtPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyFgtPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyFgtPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
