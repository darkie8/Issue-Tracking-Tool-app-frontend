import { TestBed } from '@angular/core/testing';

import { SocketCommentService } from './socket-comment.service';

describe('SocketCommentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocketCommentService = TestBed.get(SocketCommentService);
    expect(service).toBeTruthy();
  });
});
