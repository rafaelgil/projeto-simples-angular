import { Component, OnInit } from '@angular/core';
import { Cidade } from "./cidade";
import { CidadeService } from "./cidade.service";
import { EstadoService } from "../estado/estado.service";
import { Estado } from "../estado/estado";

@Component({
  selector: 'app-cidade',
  templateUrl: './cidade.component.html',
  styleUrls: ['./cidade.component.css'],
  providers:[EstadoService]
})
export class CidadeComponent implements OnInit {

  private cidade: Cidade = {
    nome: "",
    estado: "",
    codigoIBGE: ""
  }

  private cidades: Array<Cidade>;
  private estados: Array<Estado>;

  private mensagem: String;

  constructor(private service:CidadeService, private serviceestado:EstadoService) { }

  ngOnInit() {
    //this.reload();
    //this.reloadEstado();
    this.reloadCidadeComEstado();
  }

  private reloadEstado() {
    console.log('reloadEstado');
     return this.serviceestado.getEstados()
       .then(estados => this.estados = estados);
  }

  private reloadCidadeComEstado() {
    return this.service.getCidades()
      .then(cidades => {
        this.cidades = cidades
        this.serviceestado.getEstados()
          .then(estados => {
            this.estados = estados; 
            for (let i = 0; i < this.cidades.length; i++) {
              for (let j = 0; j < this.estados.length; j++) {
                if (this.cidades[i].estado == (<any>this.estados[j]).codigo) {
                  (<any>this.cidades[i]).objEstado = <any>this.estados[j]
                }
              }
            }
          });
        });
  }

  private reload() {
    return this.service.getCidades()
      .then(cidades => this.cidades = cidades);
  }

  salvar(cidade:any) {
    if (cidade.codigo) {
      this.service.pathCidade(cidade)
        .then(result => {
          this.reloadCidadeComEstado()
          this.mensagem = "Alterou!!!!";
          this.limpa();
        }).catch(error => {
          this.mensagem = "Problema ao alterar: " + error
        })
    }
    else {
      this.service.postCidade(cidade)
        .then(result => {
          this.reloadCidadeComEstado()
          this.mensagem = "Salvou!!!!";
          this.limpa();
        }).catch(error => {
          this.mensagem = "Problema ao salvar: " + error
        })
    }
  }

  deletaCidade(cidade:any) {
    this.service.deletaCidade(cidade.codigo)
      .then(() => {
        this.reloadCidadeComEstado()
        this.mensagem = "Deletado com Sucesso!!!"
      })
  }

  limpa() {
    this.cidade = {
      nome: "",
      estado: "",
      codigoIBGE: ""
    }
  }

  selecionaCidade(cidade:any) {
    this.cidade = Object.assign({}, cidade);
  }

}