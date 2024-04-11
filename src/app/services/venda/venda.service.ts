import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/common/envrionment';
import { DefaultResponse } from 'src/app/common/types/response-type';
import { Venda } from 'src/types/venda/venda-type';

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  readonly baseUrl = `${environment.baseUrl}/vendas`;
  constructor(private http: HttpClient) { }

  buscarVendas(page = 1, dataInicial = '', dataFinal = '') {
    return this.http.get<Venda[]>(`${this.baseUrl}?page=${page}&dataInicial=${dataInicial}&dataFinal=${dataFinal}`);
  }

  buscarVenda(id: number) {
    return this.http.get<Venda>(`${this.baseUrl}/${id}`);
  }

  criarVenda(venda: Venda) {
    return this.http.post<Venda>(`${this.baseUrl}`, venda);
  }

  atualizarVenda(venda: Venda) {
    return this.http.put<Venda>(`${this.baseUrl}/${venda.id}`, venda);
  }

  deletarVenda(id: number) {
    return this.http.delete<DefaultResponse<Venda>>(`${this.baseUrl}/${id}`);
  }
}
