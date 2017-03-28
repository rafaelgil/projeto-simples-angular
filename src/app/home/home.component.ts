import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  qtdCidades:number;
  qtdEstados:number;

  constructor(
    //private clienteService: ClienteService,
    //private produtoService: ProdutoService

  ) { }

  ngOnInit() {
    /*this.clienteService.getClientes().then((value) => {
      this.qtdClientes = value.length;
    })
    this.produtoService.getProdutos().then((value) => {
      this.qtdProdutos = value.length;
    })*/
  }
}