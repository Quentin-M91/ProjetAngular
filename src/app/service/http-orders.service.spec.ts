import { TestBed } from '@angular/core/testing';

import { HttpOrdersService } from './http-orders.service';

describe('HttpOrdersService', () => {
  let service: HttpOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
