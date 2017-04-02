import { Estado } from './estado';
import { Observable } from 'rxjs/Rx';
import { EstadoService } from './estado.service';
import { EstadoModule } from './estado.module';
import { EstadoComponent } from './estado.component';
import { AppRoutingModule } from '../../app.routing';
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { By } from '@angular/platform-browser';



describe('estado.component.spec.ts', () => {
  let component: EstadoComponent;
  let fixture: ComponentFixture<EstadoComponent>;
  let service: any;

  beforeEach(async(() => {

    service = jasmine.createSpyObj('service', [ 'getEstados', 'postEstado', 'pathEstado']);
    service.getEstados.and.callFake(() => Observable.of(GET_ESTADOS)
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

    TestBed.configureTestingModule({
      imports: [EstadoModule, HttpModule, AppRoutingModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: EstadoService, useValue: service}
      ]
    });
    
    TestBed.compileComponents().then(()=> {
      fixture = TestBed.createComponent(EstadoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  }));

  it('Deveria criar o component ', () => {
    expect(component).toBeTruthy();
  });

  it('Criar os campos nome e sigla e o botão salvar', () => {
    const salvar: HTMLButtonElement = fixture.debugElement.query(By.css('#btnSalvar')).nativeElement;    
    fixture.detectChanges();

    const nome: HTMLButtonElement = fixture.debugElement.query(By.css('#nome')).nativeElement;    
    const sigla: HTMLButtonElement = fixture.debugElement.query(By.css('#sigla')).nativeElement;    
    expect(salvar).toBeTruthy();
    expect(nome).toBeTruthy();
    expect(sigla).toBeTruthy();    
  });

  it('Botão salvar deve ser bloqueado inicialmente', () => {
    const salvar: HTMLButtonElement = fixture.debugElement.query(By.css('#btnSalvar')).nativeElement;    
    fixture.detectChanges();

    expect(salvar.disabled).toBeTruthy();

  });

  it('Deveria salvar estado', (done) => {
    const estado: Estado = { nome: 'São Paulo', sigla: 'SP'};
    component.estado = estado;
    
    fixture.detectChanges();
    const salvar: HTMLButtonElement = fixture.debugElement.query(By.css('#btnSalvar')).nativeElement;

    salvar.click();

    fixture.whenStable().then(() => {
      expect(service.getEstados).toHaveBeenCalled();
      done();
    });
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



