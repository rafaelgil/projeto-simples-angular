import { CidadeService } from './cidade.service';
import { Observable } from 'rxjs/Rx';
import { TestBed, inject } from '@angular/core/testing';


describe('cidade.service.spec.ts', () => {

  let http:any;
  let cidadeService:CidadeService;

  
  beforeEach(() => {
    http = jasmine.createSpyObj('http', ['get']);
    http.get.and.callFake(
      () => Observable.of([{ codigo: '-Kg5sPfGHnMV5LTyR9Dm', codigoIBGE: '53454543', estado: '-Kg5NrwGhhTnp8M1K7SL', nome: 'Maringa' }]));

    cidadeService = new CidadeService(http);
  });

  it('should be defined', () => {
    expect(cidadeService).toBeDefined();
  });

  it('get deveria ser chamado', () => {
    const estados = cidadeService.getCidades();
    expect(http.get).toHaveBeenCalledTimes(1);
  });


});