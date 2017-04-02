import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EstadoService {

  private baseUrl = 'https://estado-cidade.firebaseio.com/';

  constructor(private http:Http) { }

  getEstados() {
    return this.http.get(`${this.baseUrl}/estado.json`)
      .toPromise()
      .then(response => this.convert(response.json()));
  }

  postEstado(estado:any) {
    return this.http.post(`${this.baseUrl}/estado.json`, estado)
      .toPromise()
      .then(response => this.convert(response.json()));
  }

  pathEstado(estado:any) {
    let codigo = estado.codigo;
    delete estado.codigo;
    return this.http.patch(`${this.baseUrl}/estado/${codigo}.json`, estado)
      .toPromise();
  }

  deletaEstado(codigoEstado:any) {
    return this.http.delete(`${this.baseUrl}/estado/${codigoEstado}.json`)
      .toPromise();
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
