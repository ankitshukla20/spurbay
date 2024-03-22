export interface Product {
  name: string;
  price: number;
  description: string;
  stock?: number;
}

export interface UpdateProduct {
  name?: string;
  price?: number;
  description?: string;
  stock?: number;
}
