export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;

  price: number;
  oldPrice: number;

  rating: number;
  reviews: number;

  badge: string;

  colors: string[];
  sizes: string[];

  inStock: boolean;

  image: string;
  hoverImage: string;
}