"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "../../data/products";

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({
  product,
}: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(product.images[0]);

  return (
    <div className="flex flex-col gap-6 lg:flex-row">

      {/* Thumbnails */}
      <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col lg:overflow-visible">

        {product.images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(image)}
            className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
              activeImage === image
                ? "border-black"
                : "border-neutral-200 hover:border-neutral-500"
            }`}
          >
            <Image
              src={image}
              alt={`${product.name} ${index + 1}`}
              fill
              sizes="96px"
              className="object-cover"
            />
          </button>
        ))}

      </div>

      {/* Main Image */}
      <div className="order-1 flex-1">

        <div className="flex h-[650px] items-center justify-center overflow-hidden rounded-3xl bg-neutral-100">

          <div className="relative h-full w-full">

            <Image
              key={activeImage}
              src={activeImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-110"
            />

          </div>

        </div>

      </div>

    </div>
  );
}