import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, debounceTime, map, of, startWith, switchMap, tap } from 'rxjs';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { Produto } from 'src/types/produto/produto-type';

@Component({
  selector: 'app-produto-search',
  templateUrl: './produto-search.component.html',
  styleUrls: ['./produto-search.component.css'],
})
export class ProdutoSearchComponent implements OnInit {
  myControl = new FormControl('');
  options: Produto[] = [];
  filteredOptions!: Observable<Produto[]>;
  produtoService = inject(ProdutoService);
  @Output() produtoSelecionado: EventEmitter<Produto> = new EventEmitter<Produto>();

  ngOnInit() {
    this.produtoService.buscarProdutos().subscribe(produtos => {
      this.options = produtos;
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          debounceTime(300),
          switchMap(value => this.searchProdutos(value || ''))
        );
    });
  }

  displayFn(produto: Produto): string {
    if (!produto) {
      return '';
    }

    return `${produto.id} - ${produto.nome}`;
  }

  onSelection(event: MatAutocompleteSelectedEvent) {
    this.produtoSelecionado.emit(event.option.value);
  }

  private searchProdutos(value: string): Observable<Produto[]> {
    return this.produtoService.buscarProdutos(1, value).pipe(
      map(produtos => {
        this.options = produtos;
        return this.options;
      })
    );
  }

  reset() {
    this.myControl.reset();
  }
}
