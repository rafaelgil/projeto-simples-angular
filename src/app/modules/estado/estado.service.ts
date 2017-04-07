import { Estado } from './estado';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EstadoService {

  private baseUrl = 'https://estado-cidade.firebaseio.com/';

  constructor(private http:Http) { }

  getEstados(): Observable<Estado[]> {
    return this.http.get(`${this.baseUrl}/estado.json`)
      .map((res: Response) => this.convert(res.json()))
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postEstado(estado:any):Observable<Estado> {
    return this.http.post(`${this.baseUrl}/estado.json`, estado)
      .map((res: Response) => res.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  pathEstado(estado:any):Observable<Estado> {
    let codigo = estado.codigo;
    delete estado.codigo;
    return this.http.patch(`${this.baseUrl}/estado/${codigo}.json`, estado)
      .map((res: Response) => res.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deletaEstado(codigoEstado:any):Observable<Estado> {
    return this.http.delete(`${this.baseUrl}/estado/${codigoEstado}.json`)
      .map((res: Response) => res.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  private convert(parsedResponse:any) {
    if (parsedResponse) {
      return Object.keys(parsedResponse)
        .map(id => ({
          codigo: id,
          nome: parsedResponse[id].nome,
          sigla: parsedResponse[id].sigla
        }))
        .sort((a, b) => a.nome.localeCompare(b.nome));
    }
    return []
  }

}
