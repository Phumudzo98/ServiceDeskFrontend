import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreSettingsComponent } from './more-settings.component';

describe('MoreSettingsComponent', () => {
  let component: MoreSettingsComponent;
  let fixture: ComponentFixture<MoreSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
