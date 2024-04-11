import { Component, Inject, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { DialogService } from 'src/app/common/services/dialog.service';
import { ToastService } from 'src/app/common/services/toast.service';
import { VendaService } from 'src/app/services/venda/venda.service';
import { Venda } from 'src/types/venda/venda-type';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  vendas: Venda[] = [];
  page = 1;
  indiceExpandido = -1;
  dataInicial: string | undefined;
  dataFinal: string | undefined;
  constructor(
    private vendaService: VendaService,
    private toastService: ToastService,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.buscarVendas();
  }

  buscarVendas() {
    this.vendaService.buscarVendas(this.page, this.dataInicial, this.dataFinal).subscribe({
      next: (vendas) => {
        this.vendas = vendas;
      },
      error: (error) => {
        this.toastService.showError(error.error.message);
      }
    });
  }

  deletarVenda(vendaId: number | undefined) {
    if (!vendaId) {
      return;
    }

    const dialogRef = this.dialogService.openConfirmDialog('Deletar Venda', 'Tem certeza que deseja deletar esta venda?');
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.vendaService.deletarVenda(vendaId).subscribe({
        next: response => {
          if (!response.success) {
            this.toastService.showError(response.message);
            return;
          }

          this.vendas = this.vendas.filter((venda) => venda.id !== vendaId);
          this.toastService.showSuccess('Venda deletada com sucesso!');
        },
        error: error => {
          this.toastService.showError(error.error.message);
        }
      });
    });
  }

  paginaAnterior() {
    if (this.page === 1) {
      return;
    }

    this.vendaService.buscarVendas(this.page - 1).subscribe({
      next: (vendas) => {
        this.vendas = vendas;
        this.page--;
      },
      error: (error) => {
        this.toastService.showError(error.error.message);
      }
    });
  }

  paginaPosterior() {
    this.vendaService.buscarVendas(this.page + 1).subscribe({
      next: (vendas) => {
        this.vendas = vendas;
        this.page++;
      },
      error: (error) => {
        this.toastService.showError(error.error.message);
      }
    });
  }

  abrirDetalheVenda(index: number) {
    if (this.indiceExpandido === index) {
      this.indiceExpandido = -1;
      return;
    }

    this.indiceExpandido = index;
  }
}
