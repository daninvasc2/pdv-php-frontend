import { Component } from '@angular/core';
import { Venda } from 'src/types/venda/venda-type';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  vendas: Venda[] = [];
  constructor() { }

  excluirVenda(vendaId: number) {}
}
