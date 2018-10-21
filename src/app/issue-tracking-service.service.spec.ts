import { TestBed } from '@angular/core/testing';

import { IssueTrackingServiceService } from './issue-tracking-service.service';

describe('IssueTrackingServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IssueTrackingServiceService = TestBed.get(IssueTrackingServiceService);
    expect(service).toBeTruthy();
  });
});
