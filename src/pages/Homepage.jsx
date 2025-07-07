import Header from "../components/homepage/header"
import Hero from "../components/homepage/hero"
import Categories from "../components/homepage/categories"
import FeaturedProducts from "../components/homepage/featured-products"
import Footer from "../components/homepage/footer"
import Heritage from "../components/homepage/heritage"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Heritage />
      <Footer />
    </div>
  )
}

