"use client";

import Image from "next/image";
import { useState } from "react";


interface ProductGalleryProps {
  product: {
    name: string;
    image: string;
    hoverImage?: string;
  };
}


export default function ProductGallery({
  product,
}: ProductGalleryProps) {


  const images = [
    product.image,
    product.hoverImage || product.image,
    product.image,
  ];


  const [activeImage, setActiveImage] = useState(images[0]);



  return (
    <div className="grid gap-6 lg:grid-cols-[90px_1fr]">


      {/* Thumbnails */}

      <div className="order-2 flex gap-4 lg:order-1 lg:flex-col">


        {images.map((image,index)=>(

          <button
            key={index}
            onClick={() => setActiveImage(image)}
            className={`relative h-20 w-20 overflow-hidden rounded-xl border transition ${
              activeImage === image
                ? "border-black"
                : "border-neutral-200"
            }`}
          >

            <Image
              src={image}
              alt={`${product.name} thumbnail ${index + 1}`}
              fill
              sizes="80px"
              className="object-cover"
            />

          </button>

        ))}


      </div>




      {/* Main Image */}

      <div className="relative aspect-square overflow-hidden rounded-3xl bg-neutral-100 lg:order-2">


        <Image
          key={activeImage}
          src={activeImage}
          alt={product.name}
          fill
          sizes="(max-width:1024px) 100vw, 50vw"
          priority
          className="object-cover transition duration-500"
        />


      </div>


    </div>
  );
}