export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

export interface CreateProductInput {
  name: string;
  image?: string;
  price: number;
  category?: string;
  description?: string;
}

export interface ProductRowProps {
  product: Product;
}
