import { TestBed, inject } from '@angular/core/testing';

import { RegularizacionService } from './regularizacion.service';

describe('RegularizacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegularizacionService]
    });
  });

  it('should be created', inject([RegularizacionService], (service: RegularizacionService) => {
    expect(service).toBeTruthy();
  }));
});
