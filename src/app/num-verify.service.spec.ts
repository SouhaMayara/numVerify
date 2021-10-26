import { TestBed } from '@angular/core/testing';

import { NumVerifyService } from './num-verify.service';

describe('NumVerifyService', () => {
  let service: NumVerifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumVerifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
