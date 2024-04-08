import { TipoProduto } from "./tipo-produto-type";

export type Produto = {
  id: number;
  nome: string;
  preco: number;
  tipoProdutoId: number;
  tipoProduto?: TipoProduto;
};
