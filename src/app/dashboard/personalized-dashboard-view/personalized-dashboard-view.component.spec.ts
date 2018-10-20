import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizedDashboardViewComponent } from './personalized-dashboard-view.component';

describe('PersonalizedDashboardViewComponent', () => {
  let component: PersonalizedDashboardViewComponent;
  let fixture: ComponentFixture<PersonalizedDashboardViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalizedDashboardViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalizedDashboardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
