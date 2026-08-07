import Hero from "./components/home/Hero";
import Categories from "./components/home/Categories";
import FeaturedProducts from "./components/home/FeaturedProducts";
import PromoBanner from "./components/home/PromoBanner";
import NewArrivals from "./components/home/NewArrivals";
import WhyChooseUs from "./components/home/Whychooseus";
import Testimonials from "./components/home/Testimonials";
import Newsletter from "./components/home/Newsletter";
export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <PromoBanner />
      <NewArrivals />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </>
  );
}