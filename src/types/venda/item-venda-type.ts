import { Produto } from "../produto/produto-type";

export type ItemVenda = {
  id: number;
  vendaId: number;
  produtoId: number;
  quantidade: number;
  valorUnitario: number;
  valorImposto: number;
  valorTotal: number;
  produto: Produto;
};
