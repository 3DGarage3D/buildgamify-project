
export interface MaterialItem {
  id: string;
  codigo: string;
  descricao: string;
  unidade: string;
  preco: number;
  origem?: string;
  categoria?: string;
}

export interface Budget {
  id: string;
  name: string;
  description?: string;
  client?: string;
  createdAt: Date;
  updatedAt: Date;
  items: BudgetItem[];
  totalCost: number;
}

export interface BudgetItem {
  materialId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
