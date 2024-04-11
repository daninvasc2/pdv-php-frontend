import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/common/envrionment';
import { DefaultResponse } from 'src/app/common/types/response-type';
import { Produto } from 'src/types/produto/produto-type';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  readonly baseUrl = `${environment.baseUrl}/produtos`;
  constructor(private http: HttpClient) { }

  buscarProdutos(page = 1, pesquisa = '') {
    return this.http.get<Produto[]>(`${this.baseUrl}?page=${page}&pesquisa=${pesquisa}`);
  }

  buscarProduto(id: number) {
    return this.http.get<Produto>(`${this.baseUrl}/${id}`);
  }

  criarProduto(produto: Produto) {
    return this.http.post<DefaultResponse<Produto>>(`${this.baseUrl}`, produto);
  }

  atualizarProduto(produto: any) {
    return this.http.put<DefaultResponse<Produto>>(`${this.baseUrl}/${produto.id}`, produto);
  }

  deletarProduto(id: number) {
    return this.http.delete<DefaultResponse<Produto>>(`${this.baseUrl}/${id}`);
  }
}
