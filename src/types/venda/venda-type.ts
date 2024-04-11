import { ItemVenda } from "./item-venda-type";

export type Venda = {
  id?: number;
  valorTotal: number;
  valorTotalImposto: number;
  data: string;
  itens?: ItemVenda[];
};
