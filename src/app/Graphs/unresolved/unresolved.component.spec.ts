import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnresolvedComponent } from './unresolved.component';

describe('UnresolvedComponent', () => {
  let component: UnresolvedComponent;
  let fixture: ComponentFixture<UnresolvedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnresolvedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnresolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
