import { Estado } from './estado';
import { EstadoService } from './estado.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {

  private estado: Estado = {
    nome: "",
    sigla: ""
  }

  private estados: Array<Estado>;

  private mensagem: String;

  constructor(private service:EstadoService) { }

  ngOnInit() {
    this.reload();
  }

  private reload() {
    return this.service.getEstados()
      .then(estados => this.estados = estados);
  }

  salvar(estado:any) {
    if (estado.codigo) {
      this.service.pathEstado(estado)
        .then(result => {
          this.reload()
          this.mensagem = "Alterou!!!!";
          this.limpa();
        }).catch(error => {
          this.mensagem = "Problema ao alterar: " + error
        })
    }
    else {
      this.service.postEstado(estado)
        .then(result => {
          this.reload()
          this.mensagem = "Salvou!!!!";
          this.limpa();
        }).catch(error => {
          this.mensagem = "Problema ao salvar: " + error
        })
    }
  }

  deletaEstado(estado:any) {
    this.service.deletaEstado(estado.codigo)
      .then(() => {
        this.reload()
        this.mensagem = "Deletado com Sucesso!!!"
      })
  }

  limpa() {
    this.estado = {
      nome: "",
      sigla: ""
    }
  }

  selecionaEstado(estado:any) {
    this.estado = Object.assign({}, estado);
  }

}
