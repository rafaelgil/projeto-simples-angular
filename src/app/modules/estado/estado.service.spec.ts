import { Observable } from 'rxjs/Rx';
import { TestBed, inject } from '@angular/core/testing';

import { EstadoService } from './estado.service';
import 'rxjs/add/operator/toPromise';


describe('estado.service.spec.ts', () => {

  let http:any;
  let estadoService:EstadoService;

  
  beforeEach(() => {
    http = jasmine.createSpyObj('http', ['get']);
    http.get.and.callFake(() => Observable.of([{ codigo: '-Kg5NrwGhhTnp8M1K7SL', nome: 'Parana', sigla: 'PR' }]));

    estadoService = new EstadoService(http);
  });

  it('should be defined', () => {
    expect(estadoService).toBeDefined();
  });

  it('get deveria ser chamado', () => {
    const estados = estadoService.getEstados();
    expect(http.get).toHaveBeenCalledTimes(1);
  });


});
