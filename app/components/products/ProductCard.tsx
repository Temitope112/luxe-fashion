"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useState } from "react";


interface ProductCardProps {
  product: {
    id: number;
    slug: string;
    name: string;
    category: string;
    price: number;
    rating: number;
    reviews: number;
    badge?: string;
    image: string;
    hoverImage?: string;
  };
}


export default function ProductCard({
  product,
}: ProductCardProps) {


  const [liked, setLiked] = useState(false);


  return (

    <div className="group relative">


      <Link href={`/products/${product.slug}`}>

        {/* Image Container */}

        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-100">


          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className={`object-cover transition duration-700 ${
              product.hoverImage
                ? "group-hover:opacity-0"
                : ""
            }`}
          />



          {product.hoverImage && (

            <Image
              src={product.hoverImage}
              alt={`${product.name} alternate`}
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="object-cover opacity-0 transition duration-700 group-hover:opacity-100"
            />

          )}




          {/* Badge */}

          {product.badge && (

            <span className="absolute left-5 top-5 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white">

              {product.badge}

            </span>

          )}




        </div>



        {/* Product Details */}

        <div className="mt-5">


          <p className="text-sm text-neutral-500">
            {product.category}
          </p>


          <h3 className="mt-2 text-lg font-semibold transition group-hover:text-neutral-600">
            {product.name}
          </h3>



          <div className="mt-3 flex items-center justify-between">


            <p className="text-xl font-bold">
              ${product.price}
            </p>



            <div className="flex items-center gap-1 text-sm">

              <Star
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />

              <span>
                {product.rating}
              </span>

            </div>


          </div>


        </div>


      </Link>




      {/* Wishlist */}

      <button
        onClick={() => setLiked(!liked)}
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110"
        aria-label="Add to wishlist"
      >

        <Heart
          size={20}
          className={
            liked
              ? "fill-black"
              : ""
          }
        />

      </button>



    </div>

  );
}