import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySubscriptionsComponent } from './company-subscriptions.component';

describe('CompanySubscriptionsComponent', () => {
  let component: CompanySubscriptionsComponent;
  let fixture: ComponentFixture<CompanySubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanySubscriptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanySubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
