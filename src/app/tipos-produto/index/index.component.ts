import { Component } from '@angular/core';
import { DialogService } from 'src/app/common/services/dialog.service';
import { ToastService } from 'src/app/common/services/toast.service';
import { TipoProdutoService } from 'src/app/services/produto/tipo-produto.service';
import { TipoProduto } from 'src/types/produto/tipo-produto-type';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  tiposProduto: TipoProduto[] = [];
  tiposProdutoFiltrados: TipoProduto[] = [];
  page = 1;
  constructor(private tipoProdutoService: TipoProdutoService, private toastService: ToastService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.tipoProdutoService.buscarTiposProduto(1).subscribe((tiposProduto) => {
      this.tiposProduto = this.tiposProdutoFiltrados = tiposProduto;
    });
  }

  deletarTipoProduto(tipoProdutoId: number) {
    const dialogRef = this.dialogService.openConfirmDialog('Deletar Tipo de Produto', 'Tem certeza que deseja deletar este tipo de produto?');
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.tipoProdutoService.deletarTipoProduto(tipoProdutoId).subscribe({
        next: response => {
          if (!response.success) {
            this.toastService.showError(response.message);
            return;
          }

          this.tiposProduto = this.tiposProdutoFiltrados = this.tiposProduto.filter((tipoProduto) => tipoProduto.id !== tipoProdutoId);
          this.toastService.showSuccess('Tipo de produto deletado com sucesso!');
        },
        error: error => {
          this.toastService.showError(error.error.message);
        }
      });
    });
  }

  filtrarTipoProduto(event: any) {
    const filtro = event;

    this.tipoProdutoService.buscarTiposProduto(1, filtro).subscribe({
      next: tiposProduto => {
        this.tiposProduto = this.tiposProdutoFiltrados = tiposProduto;
      },
      error: error => {
        this.toastService.showError(error.error.message);
      }
    });
  }

  paginaAnterior() {
    if (this.page === 1) {
      return;
    }

    this.tipoProdutoService.buscarTiposProduto(this.page - 1).subscribe({
      next: tiposProduto => {
        this.tiposProduto = this.tiposProdutoFiltrados = tiposProduto;
        this.page--;
      },
      error: error => {
        this.toastService.showError(error.error.message);
      }
    });
  }

  paginaPosterior() {
    this.tipoProdutoService.buscarTiposProduto(this.page + 1).subscribe({
      next: tiposProduto => {
        this.tiposProduto = this.tiposProdutoFiltrados = tiposProduto;
        this.page++;
      },
      error: error => {
        this.toastService.showError(error.error.message);
      }
    });
  }
}
