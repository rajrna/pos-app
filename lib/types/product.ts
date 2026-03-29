export interface Product {
  id: string;
  name: string;
  image?: string;
  price: number;
  category: string;
}

export type RawProduct = {
  isVeg: boolean;
  isAvailable: boolean;
  usesOfferPrice: boolean;
  addons: unknown[];
  categories: string;
  _id: string;
  name: string;
  price: number;
  added_by: string;
  images: unknown[];
  description: string;
  inStock: number;
  lowStock: number;
  usesStocks: boolean;
  sku: string;
  adminId: string;
  constPrice: number;
  tags: unknown[];
  soldBy: string;
  orderedCount: number;
  isTaxable: boolean;
  usesCompositeItems: boolean;
  compositeItems: null;
  showInOrdering: boolean;
  discounts: unknown[];
  discountType: string;
  isLocked: boolean;
};

export function mapRawProductToProduct(
  raw: RawProduct,
): Product {
  return {
    id: raw._id,
    name: raw.name,
    category: raw.categories,
    price: raw.price,
  };
}

export type RawProductListResponse = {
  status: string;
  data: {
    products: RawProduct[];
  };
};

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
