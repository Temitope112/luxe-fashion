export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  oldPrice: number | null;
  rating: number;
  reviews: number;
  badge?: string | null;
  colors: string[];
  sizes: string[];
  inStock: boolean;
  images: string[];
}