import { TestBed } from '@angular/core/testing';

import { HttpClientsService } from './http-clients.service';

describe('HttpClientsService', () => {
  let service: HttpClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
