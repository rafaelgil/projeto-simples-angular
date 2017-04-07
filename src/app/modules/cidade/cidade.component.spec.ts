import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';
import { HttpModule } from '@angular/http';
import { CidadeService } from './cidade.service';
import { EstadoService } from '../estado/estado.service';
import { AppRoutingModule } from '../../app.routing';
import { CidadeModule } from './cidade.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { CidadeComponent } from './cidade.component';

describe('cidade.component.spec', () => {
  let component: CidadeComponent;
  let fixture: ComponentFixture<CidadeComponent>;
  let service: any;
  let serviceEstado: any;

  beforeEach(async(() => {

    serviceEstado = jasmine.createSpyObj('serviceEstado', [ 'getEstados']);
    service = jasmine.createSpyObj('service', [ 'getCidades', 'postCidade']);

    serviceEstado.getEstados.and.callFake(() => Observable.of([{codigo: '1', nome: 'PARANA', sigla: 'PR'}]));
    service.getCidades.and.callFake(() => Observable.of([{codigo: '1', nome: 'PARANA', estado: 'WFEFEFEFEFE', codigoIBGE: '8978'}]));

    TestBed.configureTestingModule({
      imports: [CidadeModule, HttpModule, AppRoutingModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: CidadeService, useValue: service},
        { provide: EstadoService, useValue: serviceEstado}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Criar os campos nome e sigla e o botão salvar', () => {
    const salvar: HTMLButtonElement = fixture.debugElement.query(By.css('#btnSalvar')).nativeElement;    
    fixture.detectChanges();

    const nome: HTMLButtonElement = fixture.debugElement.query(By.css('#nome')).nativeElement;    
    const codigoIBGE: HTMLButtonElement = fixture.debugElement.query(By.css('#codigoIBGE')).nativeElement;    
    //const estado: HTMLSelectElement = fixture.debugElement.query(By.css('#estado')).nativeElement;    
    
    expect(salvar).toBeTruthy();
    expect(codigoIBGE).toBeTruthy();
    expect(nome).toBeTruthy();    
    //expect(estado).toBeTruthy();
  });

});