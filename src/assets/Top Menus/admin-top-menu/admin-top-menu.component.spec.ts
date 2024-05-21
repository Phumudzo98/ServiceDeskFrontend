import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTopMenuComponent } from './admin-top-menu.component';

describe('AdminTopMenuComponent', () => {
  let component: AdminTopMenuComponent;
  let fixture: ComponentFixture<AdminTopMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTopMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
