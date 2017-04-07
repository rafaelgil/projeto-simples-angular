import { Estado } from './estado';
import { Observable } from 'rxjs/Rx';
import { TestBed, inject } from '@angular/core/testing';

import { EstadoService } from './estado.service';
import 'rxjs/add/operator/toPromise';


describe('estado.service.spec.ts', () => {

  let http:any;
  let estadoService:EstadoService;

  
  beforeEach(() => {
    http = jasmine.createSpyObj('http', ['get', 'post', 'patch', 'delete']);
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

  it('post deveria ser chamado', () => {
    http.post.and.callFake(() => Observable.of({}));
    const estado: Estado = {
        nome: 'São Paulo',
        sigla: 'SP'
      };
    estadoService.postEstado(estado);
    expect(http.post).toHaveBeenCalledTimes(1);
  });

   it('patch deveria ser chamado', () => {
    http.patch.and.callFake(() => Observable.of({}));
    const estado: Estado = {
        codigo: '-FWFEWFE',
        nome: 'São Paulo',
        sigla: 'PR'
      };
    estadoService.pathEstado(estado);
    expect(http.patch).toHaveBeenCalledTimes(1);
  });

  it('delete should have been called', () => {
    http.delete.and.callFake(() => Observable.of({}));
    const estado: Estado = {
        codigo: '-FWFEWFE',
        nome: 'São Paulo',
        sigla: 'PR'
      };
    estadoService.deletaEstado(estado);
    expect(http.delete).toHaveBeenCalledTimes(1);
  });


});
