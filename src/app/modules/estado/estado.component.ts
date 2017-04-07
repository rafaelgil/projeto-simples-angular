import { Estado } from './estado';
import { EstadoService } from './estado.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {

  public estado: Estado = {
    nome: "",
    sigla: ""
  }

  private estados: Array<Estado>;

  private mensagem: String;

  constructor(private service:EstadoService) { }

  ngOnInit() {
    this.reload();
  }

  public reload() {
    return this.service.getEstados()
      .subscribe(estados => this.estados = estados);
  }

  public setEstados(est:any){
    this.estados = est;
  }

  salvar(estado:any) {
    if (estado.codigo) {
      this.service.pathEstado(estado)
        .subscribe(result => {
          console.log('Passou ' + result);
          this.reload()
          this.mensagem = "Alterou!!!!";
          this.limpa();
        })
    }
    else {
      this.service.postEstado(estado)
        .subscribe(result => {
          this.reload()
          this.mensagem = "Salvou!!!!";
          this.limpa();
        });
    }
  }

  deletaEstado(estado:any) {
    this.service.deletaEstado(estado.codigo)
      .subscribe(result => {
        this.reload()
        this.mensagem = "Deletado com Sucesso!!!"
      })
  }

  limpa() {
    this.estado = {
      codigo: "",
      nome: "",
      sigla: ""
    }
  }

  selecionaEstado(estado:any) {
    this.estado = Object.assign({}, estado);
  }

}
