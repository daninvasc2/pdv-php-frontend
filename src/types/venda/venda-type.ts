import { ItemVenda } from "./item-venda-type";

export type Venda = {
  id: number;
  valorTotal: number;
  valorImpostos: number;
  data: string;
  itens?: ItemVenda[];
};
