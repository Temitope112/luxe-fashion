"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";


const testimonials = [
  {
    name: "Sophia Williams",
    role: "Verified Customer",
    review:
      "The quality exceeded my expectations. The jacket feels premium and the delivery was incredibly fast.",
  },

  {
    name: "Daniel Carter",
    role: "Verified Customer",
    review:
      "LuxeStore has become my favourite fashion store. Everything feels carefully curated.",
  },

  {
    name: "Amelia Brown",
    role: "Verified Customer",
    review:
      "Beautiful designs, smooth checkout experience, and amazing customer service.",
  },
];


export default function Testimonials() {
  return (
    <section className="bg-stone-50 py-24">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">


        {/* Heading */}
        <div className="text-center">

          <p className="text-sm uppercase tracking-[0.3em] text-stone-500">
            Customer Love
          </p>


          <h2 className="mt-4 text-4xl font-bold text-stone-900 md:text-5xl">
            What Our Customers Say
          </h2>

        </div>



        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">

          {testimonials.map((item, index) => (

            <motion.div
              key={item.name}

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

              className="rounded-3xl bg-white p-8 shadow-sm"
            >


              {/* Stars */}
              <div className="flex gap-1">

                {[1,2,3,4,5].map((star)=>(
                  <Star
                    key={star}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}

              </div>



              <p className="mt-6 leading-7 text-stone-600">
                "{item.review}"
              </p>



              <div className="mt-8">

                <h3 className="font-semibold">
                  {item.name}
                </h3>


                <p className="text-sm text-stone-500">
                  {item.role}
                </p>

              </div>


            </motion.div>

          ))}


        </div>

      </div>

    </section>
  );
}