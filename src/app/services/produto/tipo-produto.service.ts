import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/common/envrionment';
import { DefaultResponse } from 'src/app/common/types/response-type';
import { TipoProduto } from 'src/types/produto/tipo-produto-type';

@Injectable({
  providedIn: 'root'
})
export class TipoProdutoService {
  readonly baseUrl = `${environment.baseUrl}/tipos-produto`;
  constructor(private http: HttpClient) { }

  buscarTiposProduto(page?: number, pesquisa?: string) {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }

    if (pesquisa) {
      params = params.append('pesquisa', pesquisa);
    }

    return this.http.get<TipoProduto[]>(`${this.baseUrl}`, { params });
  }

  buscarTipoProduto(id: number) {
    return this.http.get<TipoProduto>(`${this.baseUrl}/${id}`);
  }

  criarTipoProduto(tipoProduto: any) {
    return this.http.post<DefaultResponse<TipoProduto>>(`${this.baseUrl}`, tipoProduto);
  }

  atualizarTipoProduto(tipoProduto: any) {
    return this.http.put<DefaultResponse<TipoProduto>>(`${this.baseUrl}/${tipoProduto.id}`, tipoProduto);
  }

  deletarTipoProduto(id: number) {
    return this.http.delete<DefaultResponse<TipoProduto>>(`${this.baseUrl}/${id}`);
  }
}
