import { notFound } from "next/navigation";

import { products } from "../../data/products";

import ProductGallery from "../../components/products/ProductGallery";


interface ProductPageProps {
  params: Promise<{
    slug:string;
  }>;
}


export default async function ProductPage({
  params,
}:ProductPageProps){


  const {slug}=await params;


  const product = products.find(
    (item)=>item.slug===slug
  );


  if(!product){
    notFound();
  }



  return (

    <main className="bg-white">

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">


        <div className="grid gap-12 lg:grid-cols-2">


          <ProductGallery
            product={product}
          />



          <div>

            <p className="text-sm uppercase tracking-widest text-neutral-500">
              {product.category}
            </p>


            <h1 className="mt-4 text-5xl font-bold">
              {product.name}
            </h1>


            <p className="mt-6 text-3xl font-semibold">
              ${product.price}
            </p>


          </div>


        </div>


      </section>

    </main>

  );
}