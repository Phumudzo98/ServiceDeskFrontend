import { TestBed } from '@angular/core/testing';

import { AuthAgentUserService } from './auth-agent-user.service';

describe('AuthAgentUserService', () => {
  let service: AuthAgentUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthAgentUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
