import "../../styles/globals.css";
const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              A Tapestry of <span className="hero-title-bold">Nepalese Heritage</span>
            </h1>
            <p className="hero-description">Where ancient Himalayan craftsmanship meets contemporary elegance.</p>
            <div className="hero-buttons">
              <a href="#" className="btn-primary">
                Discover Heritage
              </a>
              <a href="#" className="btn-secondary">
                Artisan Stories
              </a>
            </div>
          </div>
          <div className="hero-image-container">
            <img src="/images/hero.jpeg?height=500&width=400" alt="Heritage Bag" className="hero-image" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero