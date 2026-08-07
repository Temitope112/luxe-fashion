"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";


export default function Newsletter() {
  return (
    <section className="bg-black py-24 text-white">

      <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">


        <motion.div
          initial={{
            opacity:0,
            y:30,
          }}

          whileInView={{
            opacity:1,
            y:0,
          }}

          viewport={{
            once:true,
          }}
        >

          <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
            Stay Updated
          </p>


          <h2 className="mt-5 text-4xl font-bold md:text-6xl">
            Join The Luxe Community
          </h2>


          <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-400">
            Subscribe for new collections, exclusive offers,
            and early access to limited releases.
          </p>



          <form className="mx-auto mt-10 flex max-w-xl flex-col gap-4 sm:flex-row">


            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full bg-white px-6 py-4 text-black outline-none"
            />


            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:bg-neutral-200"
            >

              Subscribe

              <ArrowRight size={18}/>

            </button>


          </form>


        </motion.div>


      </div>

    </section>
  );
}