"use client";

import {
  Truck,
  ShieldCheck,
  Gem,
  RefreshCcw,
} from "lucide-react";

import { motion } from "framer-motion";


const features = [
  {
    icon: Gem,
    title: "Premium Quality",
    description:
      "Carefully selected materials and timeless designs made to last.",
  },

  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Reliable shipping with updates from checkout to your doorstep.",
  },

  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description:
      "Your transactions are protected with trusted payment systems.",
  },

  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description:
      "Shop confidently with simple and stress-free returns.",
  },
];


export default function WhyChooseUs() {
  return (
    <section className="bg-white py-24">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">


        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">

          <p className="text-sm uppercase tracking-[0.3em] text-stone-500">
            Why LuxeStore
          </p>


          <h2 className="mt-4 text-4xl font-bold text-stone-900 md:text-5xl">
            Designed Around Your Experience
          </h2>


          <p className="mt-5 text-lg text-stone-600">
            From selecting premium pieces to delivering them safely,
            every detail is crafted around you.
          </p>

        </div>



        {/* Cards */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">


          {features.map((feature, index) => {

            const Icon = feature.icon;


            return (

              <motion.div

                key={feature.title}

                initial={{
                  opacity: 0,
                  y: 30,
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

                className="rounded-3xl border border-stone-200 bg-stone-50 p-8 transition hover:-translate-y-2 hover:shadow-xl"

              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">

                  <Icon size={26} />

                </div>


                <h3 className="mt-6 text-xl font-semibold">
                  {feature.title}
                </h3>


                <p className="mt-3 leading-7 text-stone-600">
                  {feature.description}
                </p>


              </motion.div>

            );

          })}


        </div>

      </div>

    </section>
  );
}