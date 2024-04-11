import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/common/services/toast.service';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { TipoProdutoService } from 'src/app/services/produto/tipo-produto.service';
import { TipoProduto } from 'src/types/produto/tipo-produto-type';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  operacao = 'Cadastro';
  formProduto: FormGroup = new FormGroup({});
  tiposProduto: TipoProduto[] = [];
  produtoId: number | undefined;
  constructor(
    private produtoService: ProdutoService,
    private formBuilder: FormBuilder,
    private tipoProdutoService: TipoProdutoService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.operacao = 'Edição';
        this.produtoId = params['id'];
        this.produtoService.buscarProduto(params['id']).subscribe({
          next: (produto) => {
            if (!produto) {
              this.toastService.showError('Produto não encontrado');
              return;
            }
            this.formProduto.patchValue(produto);
            this.formProduto.controls['tipoProdutoId'].setValue(produto.tipoProduto!.id);
          },
          error: (error) => {
            this.toastService.showError(error.error.message);
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.formProduto = this.formBuilder.group({
        nome: ['', [Validators.required]],
        tipoProdutoId: ['', [Validators.required]],
        preco: ['', [Validators.required]]
    });
    this.buscarTiposProduto();
  }

  buscarTiposProduto() {
    this.tipoProdutoService.buscarTiposProduto().subscribe({
      next: (tiposProduto) => {
        this.tiposProduto = tiposProduto;
      },
      error: (error) => {
        this.toastService.showError(error.error.message);
      }
    });
  }

  salvarProduto() {
    if (!this.formProduto.valid) {
      this.toastService.showError('Preencha todos os campos');
      return;
    }

    if (this.operacao === 'Edição') {
      this.atualizarProduto();
      return;
    }

    this.criarProduto();
  }

  criarProduto() {
    this.produtoService.criarProduto(this.formProduto.value).subscribe({
      next: (response) => {
        if (response.success) {
          this.formProduto.reset();
          this.toastService.showSuccess('Produto cadastrado com sucesso');
        } else {
          this.toastService.showError(response.message);
        }
      },
      error: (error) => {
        this.toastService.showError(error.error.message);
      }
    });
  }

  atualizarProduto() {
    const produtoRequest = this.formProduto.value;
    produtoRequest.id = this.produtoId;
    this.produtoService.atualizarProduto(produtoRequest).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastService.showSuccess('Produto atualizado com sucesso');
          this.router.navigate(['/produtos']);
        } else {
          this.toastService.showError(response.message);
        }
      },
      error: (error) => {
        this.toastService.showError(error.error.message);
      }
    });
  }
}
