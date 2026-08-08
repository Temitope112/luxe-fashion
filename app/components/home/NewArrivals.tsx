"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { products } from "../../data/products";


export default function NewArrivals() {
  const newProducts = products.slice(0, 4);

  return (
    <section className="bg-stone-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-stone-500">
              Latest Drop
            </p>

            <h2 className="mt-4 text-4xl font-bold text-stone-900 md:text-5xl">
              New Arrivals
            </h2>

            <p className="mt-4 max-w-xl text-stone-600">
              Discover our newest pieces carefully selected for the modern wardrobe.
            </p>
          </div>


          <Link
            href="/products"
            className="group flex items-center gap-2 font-semibold"
          >
            View All Products

            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

        </div>


        {/* Products */}
        <div className="grid gap-8 md:grid-cols-2">

          {newProducts.map((product, index) => (

            <motion.article
              key={product.id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="group"
            >

              <Link href={`/products/${product.slug}`}>

                <div className="relative aspect-[4/5] overflow-hidden rounded-[32px]">

                 <Image
  src={product.images[0]}
  alt={product.name}
  fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />


                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />


                  <span className="absolute left-6 top-6 rounded-full bg-white px-4 py-2 text-xs font-semibold">
                    New
                  </span>

                </div>


                <div className="mt-5 flex items-center justify-between">

                  <div>

                    <p className="text-sm text-stone-500">
                      {product.category}
                    </p>

                    <h3 className="mt-1 text-xl font-semibold">
                      {product.name}
                    </h3>

                  </div>


                  <p className="text-lg font-bold">
                    ${product.price}
                  </p>

                </div>

              </Link>

            </motion.article>

          ))}

        </div>

      </div>
    </section>
  );
}