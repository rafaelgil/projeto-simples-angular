import { TestBed, inject } from '@angular/core/testing';

import { EstadoService } from './estado.service';

describe('EstadoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstadoService]
    });
  });

  it('should ...', inject([EstadoService], (service: EstadoService) => {
    expect(service).toBeTruthy();
  }));
});
