import { TestBed } from '@angular/core/testing';

import { HttpProduitsService } from './http-produits.service';

describe('HttpProduitsService', () => {
  let service: HttpProduitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpProduitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
