import { Observable } from 'rxjs/Rx';
import { AppRoutingModule } from './../../app.routing';
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { EstadoComponent } from "app/modules/estado/estado.component";
import { EstadoModule } from "app/modules/estado/estado.module";

fdescribe('estado.component.spec.ts', () => {
  let component: EstadoComponent;
  let fixture: ComponentFixture<EstadoComponent>;
  let service: any;

  beforeEach(async(() => {

    service = jasmine.createSpyObj('service', [ 'getEstados']);
    service.getEstados.and.callFake(function(){
      return Observable.of([]);
    });

    TestBed.configureTestingModule({
      imports: [EstadoModule, HttpModule, AppRoutingModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        {service}
      ]
    });
    
    TestBed.compileComponents().then(()=> {
      fixture = TestBed.createComponent(EstadoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('E agora', () => {
    component.reload();
    expect(service.getEstados).toHaveBeenCalled();
        
  });


});