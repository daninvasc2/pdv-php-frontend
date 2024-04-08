import { Component } from '@angular/core';
import { Produto } from 'src/types/produto/produto-type';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  produtos: Produto[] = [];
  constructor() { }

  excluirProduto(produtoId: number) {

  }
}
