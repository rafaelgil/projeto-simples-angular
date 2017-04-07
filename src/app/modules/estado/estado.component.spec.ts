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
  let serviceEstado: any;

  beforeEach(async(() => {

    service = jasmine.createSpyObj('service', [ 'getEstados', 'postEstado', 'pathEstado']);

    
    service.getEstados.and.callFake(() => Observable.of([{codigo: '1', nome: 'PARANA', sigla: 'PR'}]));
    service.postEstado.and.callFake(() => Observable.of([{nome: 'São Paulo', sigla: 'SP'}]));

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
    
    const salvar: HTMLButtonElement = fixture.debugElement.query(By.css('#btnSalvar')).nativeElement;

    salvar.click();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(service.postEstado).toHaveBeenCalled();
      expect(service.getEstados).toHaveBeenCalled();
      done();
    });
  });


});



