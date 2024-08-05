import { TestBed } from '@angular/core/testing';

import { ZenviaService } from './zenvia.service';

describe('ZenviaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZenviaService = TestBed.get(ZenviaService);
    expect(service).toBeTruthy();
  });
});
