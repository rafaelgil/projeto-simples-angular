import { Cidade } from './cidade';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CidadeService {

  private baseUrl = 'https://estado-cidade.firebaseio.com/';

  constructor(private http:Http) { }

  getCidades():Observable<Cidade[]> {
    return this.http.get(`${this.baseUrl}/cidade.json`)
      .map((res: Response) => this.convert(res.json()))
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postCidade(cidade:any):Observable<Cidade> {
    return this.http.post(`${this.baseUrl}/cidade.json`, cidade)
      .map((res: Response) => res.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  pathCidade(cidade:any):Observable<Cidade> {
    let codigo = cidade.codigo;
    delete cidade.codigo;
    return this.http.patch(`${this.baseUrl}/cidade/${codigo}.json`, cidade)
      .map((res: Response) => res.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deletaCidade(codigoCidade:any):Observable<Cidade> {
    return this.http.delete(`${this.baseUrl}/cidade/${codigoCidade}.json`)
     .map((res: Response) => res.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  private convert(parsedResponse:any) {
    if (parsedResponse) {
      return Object.keys(parsedResponse)
        .map(id => ({
          codigo: id,
          nome: parsedResponse[id].nome,
          estado:parsedResponse[id].estado,
          codigoIBGE: parsedResponse[id].codigoIBGE
        }))
        .sort((a, b) => a.nome.localeCompare(b.nome));
    }
    return []
  }

}
