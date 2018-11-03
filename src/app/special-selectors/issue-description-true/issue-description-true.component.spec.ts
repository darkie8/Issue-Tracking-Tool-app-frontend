import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueDescriptionTrueComponent } from './issue-description-true.component';

describe('IssueDescriptionTrueComponent', () => {
  let component: IssueDescriptionTrueComponent;
  let fixture: ComponentFixture<IssueDescriptionTrueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueDescriptionTrueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueDescriptionTrueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
