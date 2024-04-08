import { Component } from '@angular/core';
import { TipoProduto } from 'src/types/produto/tipo-produto-type';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  tiposProduto: TipoProduto[] = [];
  constructor() { }

  excluirTipoProduto(tipoProdutoId: number) {

  }
}
