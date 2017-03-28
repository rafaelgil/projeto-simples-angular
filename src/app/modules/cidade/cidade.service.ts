import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CidadeService {

  private baseUrl = 'https://estado-cidade.firebaseio.com/';

  constructor(private http:Http) { }

  getCidades() {
    return this.http.get(`${this.baseUrl}/cidade.json`)
      .toPromise()
      .then(response => this.convert(response.json()));
  }

  postCidade(cidade:any) {
    return this.http.post(`${this.baseUrl}/cidade.json`, cidade)
      .toPromise()
      .then(response => this.convert(response.json()));
  }

  pathCidade(cidade:any) {
    let codigo = cidade.codigo;
    delete cidade.codigo;
    return this.http.patch(`${this.baseUrl}/cidade/${codigo}.json`, cidade)
      .toPromise();
  }

  deletaCidade(codigoCidade:any) {
    return this.http.delete(`${this.baseUrl}/cidade/${codigoCidade}.json`)
      .toPromise();
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
