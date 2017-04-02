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

describe('CidadeComponent', () => {
  let component: CidadeComponent;
  let fixture: ComponentFixture<CidadeComponent>;
  let service: any;
  let serviceEstado: any;

  beforeEach(async(() => {

    serviceEstado = jasmine.createSpyObj('serviceEstado', [ 'getEstados']);
    service = jasmine.createSpyObj('service', [ 'getCidades', 'postCidade']);

    serviceEstado.getEstados.and.callFake(() => Observable.of(GET_ESTADOS)
      .toPromise()
      .then(
          parsedResponse => {
              if (parsedResponse) {
                return Object.keys(parsedResponse)
                  .map(id => ({
                    codigo: id,
                    nome: parsedResponse[id].nome,
                    sigla: parsedResponse[id].sigla
                  }))
                  .sort((a, b) => a.nome.localeCompare(b.nome));
              }
              return [];
            }
     ).then(estados => component.setEstados(estados)));

    service.getCidades.and.callFake(() => Observable.of(GET_CIDADES)
      .toPromise()
      .then(
          parsedResponse => {
              if (parsedResponse) {
                return Object.keys(parsedResponse)
                  .map(id => ({
                    codigo: id,
                    nome: parsedResponse[id].nome,
                    sigla: parsedResponse[id].sigla
                  }))
                  .sort((a, b) => a.nome.localeCompare(b.nome));
              }
              return [];
            }
      ).then(cidades => component.setCidades(cidades)));

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

const GET_ESTADOS = {
	"-Kg5NrwGhhTnp8M1K7SL": {
		"nome": "Parana",
		"sigla": "PR"
	},
	"-Kg5lkXgEjFRxJ-qTSCF": {
		"nome": "Rio de Janeiro",
		"sigla": "RJ"
	},
	"-Kg5lnDeQ_H1LoZ-tqQg": {
		"nome": "Santa Catarina",
		"sigla": "SC"
	},
	"-KgaXcMe1E85S6SOefuy": {
		"nome": "Sao Paulo",
		"sigla": "SP"
	}
}

const GET_CIDADES = {
	"-Kg5sPfGHnMV5LTyR9Dm": {
		"codigoIBGE": "53454543",
		"estado": "-Kg5NrwGhhTnp8M1K7SL",
		"nome": "Maringá",
		"objEstado": {
			"codigo": "-Kg5NrwGhhTnp8M1K7SL",
			"nome": "Parana",
			"sigla": "PR"
		}
	},
	"-Kg60wbM2YyWj1L-kYJd": {
		"codigoIBGE": "452523",
		"estado": "-Kg5lnDeQ_H1LoZ-tqQg",
		"nome": "Sarandi"
	},
	"-KgaZiWV-noVfBRLCgSW": {
		"codigoIBGE": "125488",
		"estado": "-KgaXcMe1E85S6SOefuy",
		"nome": "Presidente Prudente"
	},
	"-KgaZxIoSlEHgI2HFdkp": {
		"codigoIBGE": "58788",
		"estado": "-KgaXcMe1E85S6SOefuy",
		"nome": "Bauru"
	}
}