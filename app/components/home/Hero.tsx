"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5]">
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-stone-300/30 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col items-center justify-between gap-20 px-6 py-20 lg:flex-row lg:px-8">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <span className="inline-flex items-center rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium shadow-sm mt-6">
            ✨ New Collection 2026
          </span>

          <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-neutral-900 md:text-6xl lg:text-7xl">
            Luxury Fashion
            <br />
            Designed for
            <br />
            Modern Living.
          </h1>

          <p className="mt-8 text-lg leading-8 text-neutral-600">
            Discover timeless fashion crafted for confidence, elegance and
            everyday luxury. Explore premium collections designed to elevate
            your lifestyle.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-black px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <Link
              href="/categories"
              className="inline-flex items-center justify-center rounded-full border border-black px-8 py-4 font-semibold transition-all duration-300 hover:bg-black hover:text-white"
            >
              Explore Collection
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-4">
            {[
              {
                value: "20K+",
                label: "Customers",
              },
              {
                value: "500+",
                label: "Products",
              },
              {
                value: "4.9★",
                label: "Rating",
              },
            ].map((item) => (
              <motion.div
                whileHover={{ y: -6 }}
                key={item.label}
                className="rounded-2xl bg-white p-5 text-center shadow-md"
              >
                <h3 className="text-2xl font-bold">{item.value}</h3>
                <p className="mt-1 text-sm text-gray-500">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT IMAGES */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="relative hidden h-[700px] w-full max-w-xl lg:block"
        >
          {/* Main Image */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="absolute left-0 top-0 h-[520px] w-[340px] overflow-hidden rounded-[36px] shadow-2xl mt-6"
          >
            <Image
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900&q=80"
              alt="Fashion Model"
              fill
              priority
              className="object-cover"
            />
          </motion.div>

          {/* Top Right */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
            className="absolute right-0 top-16 h-[250px] w-[220px] overflow-hidden rounded-[30px] shadow-xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80"
              alt="Fashion"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Bottom Right */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="absolute bottom-0 right-10 h-[230px] w-[250px] overflow-hidden rounded-[30px] shadow-xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=80"
              alt="Lifestyle Fashion"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Rating Card */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute left-56 top-8 rounded-2xl bg-white px-5 py-4 shadow-xl"
          >
            <p className="text-xs text-gray-500">Customer Rating</p>
            <h3 className="mt-1 text-xl font-bold">⭐ 4.9 / 5</h3>
          </motion.div>

          {/* Discount Card */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="absolute bottom-16 left-8 rounded-2xl bg-black px-6 py-5 text-white shadow-2xl"
          >
            <p className="text-sm text-gray-300">Limited Offer</p>
            <h3 className="text-2xl font-bold">30% OFF</h3>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}