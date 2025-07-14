import Footer from "@/components/Footer";
import FooterBanner from "@/components/FooterBanner";
import HeroBanner from "@/components/HeroBanner";
import { client } from "@/lib/sanity-client";
import { product } from "../../sanity-studio/schemaTypes/documents/product";
import { productsQuery } from "@/lib/queries";
import { fetchBanners, fetchProducts, fetchStory } from "@/lib/sanity-fetch";
import Product from "@/components/Product";
import StoryLane from "@/components/StoryLane";



export default async function Home() {
  const products = await fetchProducts();
  const banners = await fetchBanners();
  const storylane = await fetchStory();
  return (
    <>
      <HeroBanner banner={banners?.length > 0 && banners[0]} />
      <section className="my-12">
        <h2 className="text-2xl font-bold mb-4 text-center">
          See how our product works
        </h2>
        <div className="flex justify-center">
          <StoryLane storylane={storylane} />
        </div>
      </section>
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speaker of many variations</p>
      </div>
      <div className="products-container">
        {
          products.map((product: any) => <Product key={product?._id} product={product} />)
        }
      </div>
      <FooterBanner banner={banners?.length && banners[0]} />
    </>
  );
}
