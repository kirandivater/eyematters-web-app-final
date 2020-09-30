import { TestBed } from '@angular/core/testing';

import { RegLoginService } from './reg-login.service';

describe('RegLoginService', () => {
  let service: RegLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
