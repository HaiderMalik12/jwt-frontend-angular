export interface ProductInput {
  title: string;
  description: string;
  qty: number;
  price: number;
}

export interface Product extends ProductInput {
  _id: string;
}
