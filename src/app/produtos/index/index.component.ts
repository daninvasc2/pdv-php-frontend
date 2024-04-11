import { Component } from '@angular/core';
import { DialogService } from 'src/app/common/services/dialog.service';
import { ToastService } from 'src/app/common/services/toast.service';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { Produto } from 'src/types/produto/produto-type';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  page = 1;
  constructor(private produtoService: ProdutoService, private toastService: ToastService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.produtoService.buscarProdutos().subscribe({
      next: (produtos) => {
        this.produtos = this.produtosFiltrados = produtos;
      },
      error: (error) => {
        this.toastService.showError(error.error.message);
      }
    });
  }

  deletarProduto(produtoId: number) {
    const dialogRef = this.dialogService.openConfirmDialog('Deletar Produto', 'Tem certeza que deseja deletar este produto?');
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.produtoService.deletarProduto(produtoId).subscribe({
        next: (response) => {
          if (!response.success) {
            this.toastService.showError(response.message);
            return;
          }

          this.produtoService.buscarProdutos().subscribe({
            next: (produtos) => {
              this.produtos = this.produtosFiltrados = produtos;
            },
            error: (error) => {
              this.toastService.showError(error.error.message);
            }
          });
          this.toastService.showSuccess(response.message);
        },
        error: (error) => {
          this.toastService.showError(error.error.message);
        }
      });
    });
  }

  filtrarProduto(event: any) {
    const filtro = event;

    this.produtoService.buscarProdutos(1, filtro).subscribe({
      next: (produtos) => {
        this.produtos = this.produtosFiltrados = produtos;
      },
      error: () => {
        this.toastService.showError('Não foi possível filtrar os produtos');
      }
    });
  }

  paginaAnterior() {
    if (this.page === 1) {
      return;
    }

    this.page--;

    this.produtoService.buscarProdutos(this.page).subscribe({
      next: (produtos) => {
        this.produtos = this.produtosFiltrados = produtos;
      },
      error: () => {
        this.toastService.showError('Não foi possível carregar a página anterior');
      }
    });
  }

  paginaPosterior() {
    this.page++;

    this.produtoService.buscarProdutos(this.page).subscribe({
      next: (produtos) => {
        this.produtos = this.produtosFiltrados = produtos;
      },
      error: () => {
        this.toastService.showError('Não foi possível carregar a próxima página');
      }
    });
  }
}
