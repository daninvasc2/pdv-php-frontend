import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/common/services/toast.service';
import { ProdutoSearchComponent } from 'src/app/produtos/produto-search/produto-search.component';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { VendaService } from 'src/app/services/venda/venda.service';
import { Produto } from 'src/types/produto/produto-type';
import { ItemVenda } from 'src/types/venda/item-venda-type';
import { Venda } from 'src/types/venda/venda-type';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  operacao = 'Cadastro';
  formItensVenda: FormGroup = new FormGroup({});
  itensVenda: ItemVenda[] = [];
  produtos: Produto[] = [];
  valorTotal = 0;
  valorTotalImpostos = 0;
  @ViewChild('produtoSearch') produtoSearch!: ProdutoSearchComponent;

  constructor(
    private vendaService: VendaService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formItensVenda = this.formBuilder.group({
      produto: this.formBuilder.control(''),
      quantidade: this.formBuilder.control(''),
      valorUnitario: this.formBuilder.control(''),
      valorTotal: this.formBuilder.control('').disable(),
      valorImpostos: this.formBuilder.control('')
    });
  }

  salvarVenda() {
    const venda: Venda = {
      valorTotal: this.valorTotal,
      valorTotalImposto: this.valorTotalImpostos,
      data: new Date().toISOString(),
      itens: this.itensVenda
    };

    this.vendaService.criarVenda(venda).subscribe({
      next: () => {
        this.toastService.showSuccess('Venda criada com sucesso');
        this.router.navigate(['/vendas']);
      },
      error: (error) => {
        this.toastService.showError(error.error.message);
      }
    });

  }

  buscarProdutos() {
    this.produtoService.buscarProdutos().subscribe(produtos => {
      this.produtos = produtos;
    });
  }

  adicionarItemVenda() {
    const itemVenda = this.formItensVenda.value;
    const valorImpostoItemVenda = this.calcularValorImpostos(itemVenda);
    itemVenda.valorImposto = valorImpostoItemVenda;
    itemVenda.produtoId = itemVenda.produto.id;
    this.itensVenda.push(itemVenda);

    this.valorTotalImpostos += valorImpostoItemVenda;
    this.valorTotal += parseFloat(itemVenda.valorTotal);

    this.limparItemVenda();
  }

  calcularValorTotal() {
    const quantidade = this.formItensVenda.get('quantidade')!.value;
    const valorUnitario = this.formItensVenda.get('valorUnitario')!.value;
    const formattedValue = parseFloat(quantidade) * parseFloat(valorUnitario);
    this.formItensVenda.get('valorTotal')!.setValue(formattedValue.toFixed(2));
  }

  limparItemVenda() {
    this.formItensVenda.reset();
    this.produtoSearch.reset();
  }

  removerItemVenda(item: ItemVenda) {
    this.itensVenda = this.itensVenda.filter(i => i !== item);
    this.valorTotal -= item.valorTotal;
    this.valorTotalImpostos -= item.valorImposto;
  }

  produtoSelecionado(produto: Produto) {
    this.formItensVenda.get('produto')!.setValue(produto);
    this.formItensVenda.get('valorUnitario')!.setValue(produto.preco);
    this.formItensVenda.get('quantidade')!.setValue(1);
    this.calcularValorTotal();
  }

  calcularValorImpostos(itemVenda: ItemVenda) {
    const valorTotal = itemVenda.valorTotal;
    const porcentagemImpostos = itemVenda.produto.tipoProduto?.porcentagemImposto || 0;
    if (porcentagemImpostos === 0) {
      return 0;
    }

    const valorImpostos = (valorTotal * porcentagemImpostos / 100);
    return valorImpostos;
  }
}
