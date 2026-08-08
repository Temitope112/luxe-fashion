export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;

  price: number;
  oldPrice: number;

  rating: number;
  reviews: number;

  badge?: string;

  colors: string[];
  sizes: string[];

  inStock: boolean;

  images: string[];
}

export const products: Product[] = [
  {
    id: 1,
    slug: "classic-leather-jacket",
    name: "Classic Leather Jacket",
    category: "Women",
    price: 149.99,
    oldPrice: 189.99,
    rating: 4.9,
    reviews: 182,
    badge: "Best Seller",

    colors: ["Black", "Brown"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,

    images: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80",
    ],
  },

  {
    id: 2,
    slug: "premium-sneakers",
    name: "Premium Sneakers",
    category: "Footwear",
    price: 119.99,
    oldPrice: 149.99,
    rating: 4.8,
    reviews: 94,
    badge: "New",

    colors: ["White", "Black"],
    sizes: ["40", "41", "42", "43", "44"],
    inStock: true,

    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1200&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1200&q=80",
    ],
  },

  {
    id: 3,
    slug: "luxury-handbag",
    name: "Luxury Handbag",
    category: "Accessories",
    price: 189.99,
    oldPrice: 229.99,
    rating: 5.0,
    reviews: 64,
    badge: "Trending",

    colors: ["Black", "Beige"],
    sizes: ["One Size"],
    inStock: true,

    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=80",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=1200&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=1200&q=80",
    ],
  },

  {
    id: 4,
    slug: "minimal-hoodie",
    name: "Minimal Hoodie",
    category: "Men",
    price: 79.99,
    oldPrice: 99.99,
    rating: 4.7,
    reviews: 220,
    badge: "Popular",

    colors: ["Gray", "Black", "Cream"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,

    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1200&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80",
    ],
  },

  {
    id: 5,
    slug: "elegant-dress",
    name: "Elegant Dress",
    category: "Women",
    price: 129.99,
    oldPrice: 169.99,
    rating: 4.9,
    reviews: 145,
    badge: "Editor's Pick",

    colors: ["Red", "Emerald", "Black"],
    sizes: ["XS", "S", "M", "L"],
    inStock: true,

    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80",
    ],
  },

  {
    id: 6,
    slug: "luxury-watch",
    name: "Luxury Watch",
    category: "Accessories",
    price: 249.99,
    oldPrice: 299.99,
    rating: 5.0,
    reviews: 51,
    badge: "Premium",

    colors: ["Silver", "Gold"],
    sizes: ["One Size"],
    inStock: true,

    images: [
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=1200&q=80",
      "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=1200&q=80",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&q=80",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=1200&q=80",
    ],
  },
];