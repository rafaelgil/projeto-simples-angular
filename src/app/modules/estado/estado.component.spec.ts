import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoComponent } from './estado.component';
import 'rxjs/add/operator/toPromise';

fdescribe('estado.component.spec.ts', () => {
  let estadoComponent: EstadoComponent;
  let service;

  beforeEach(() => {
    service = jasmine.createSpyObj('service', ['getEstados']);
    
    estadoComponent = new EstadoComponent(service);
  });

  it('Componente foi criado', () => {
    expect(estadoComponent).toBeTruthy();
  });

  it('E agora ', () => {
    service.getEstados.and.callFake(function(){
      return [];
    });
    estadoComponent.reload();
    //expect(service.getEstados).toHaveBeenCalled();
  });

});
