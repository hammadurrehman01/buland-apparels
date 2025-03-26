import Banner from "./Banner";
import FeaturedSection from "./FeaturedSection";
import InstagramFeed from "./InstagramFeed";
import Manifesto from "./Manifesto";
import ProductSlider from "./ProductSlider";
import TestimonialSlider from "./TestimonialSlider";

export default function Home() {



  return (
    <div >
      <Banner/>
      <FeaturedSection/>
      <TestimonialSlider/>
      <ProductSlider/>
      <InstagramFeed/>
      <Manifesto/>
    </div>
  );
}
