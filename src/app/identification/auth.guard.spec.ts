import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';

describe('authGuard', () => {
  let executeGuard: AuthGuard; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard], // Fournir le guard ici
    });

    executeGuard = TestBed.inject(AuthGuard); // Injecter le guard
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
