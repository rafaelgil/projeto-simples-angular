import { Cidade } from './cidade';
import { CidadeService } from './cidade.service';
import { Observable } from 'rxjs/Rx';
import { TestBed, inject } from '@angular/core/testing';


describe('cidade.service.spec.ts', () => {

  let http:any;
  let cidadeService:CidadeService;

  
  beforeEach(() => {
    http = jasmine.createSpyObj('http', ['get', 'post', 'patch', 'delete']);
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

  it('post deveria ser chamado', () => {
    http.post.and.callFake(() => Observable.of({}));
    const cidade: Cidade = {        
        nome: 'São Paulo',
        estado: '-EGEGFEYG',
        codigoIBGE: '4545487'
      };
    cidadeService.postCidade(cidade);
    expect(http.post).toHaveBeenCalledTimes(1);
  });

  it('patch deveria ser chamado', () => {
    http.patch.and.callFake(() => Observable.of({}));
    const cidade: Cidade = {        
        codigo:'DFEFE',
        nome: 'São Paulo',
        estado: '-EGEGFEYG',
        codigoIBGE: '4545487'
      };
    cidadeService.pathCidade(cidade);
    expect(http.patch).toHaveBeenCalledTimes(1);
  });

  it('delete deveria ser chamado', () => {
    http.delete.and.callFake(() => Observable.of({}));
    const cidade: Cidade = {        
        codigo:'DFEFE',
        nome: 'São Paulo',
        estado: '-EGEGFEYG',
        codigoIBGE: '4545487'
      };
    cidadeService.deletaCidade(cidade);
    expect(http.delete).toHaveBeenCalledTimes(1);
  });


});