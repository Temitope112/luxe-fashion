// "use client";

// import ProductCard from "./ProductCard";
// import type { Product } from "../../types/product";

// interface ProductsGridProps {
//   products: Product[];
// }

// export default function ProductsGrid({
//   products,
// }: ProductsGridProps) {
//   if (products.length === 0) {
//     return (
//       <section className="py-20">
//         <div className="flex flex-col items-center justify-center text-center">
//           <h2 className="text-2xl font-semibold">
//             No products found
//           </h2>

//           <p className="mt-3 max-w-md text-neutral-500">
//             We couldn't find any products matching your search or
//             selected category. Try adjusting your filters.
//           </p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
//       {products.map((product) => (
//         <ProductCard
//           key={product.id}
//           product={product}
//         />
//       ))}
//     </div>
//   );
// }
"use client";

import ProductCard from "./ProductCard";
import type { Product } from "../../types/product";

interface ProductsGridProps {
  products: Product[];
}

export default function ProductsGrid({
  products,
}: ProductsGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-neutral-200">
        <div className="px-6 text-center">
          <h3 className="text-lg font-semibold">
            No products found
          </h3>

          <p className="mt-3 max-w-md text-neutral-500">
            We couldn't find any products matching your selected
            category.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}