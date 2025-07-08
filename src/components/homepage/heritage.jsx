import "../../styles/globals.css";
const Heritage = () => {
  return (
    <section className="heritage">
      <div className="container">
        <div className="heritage-content">
          <div className="heritage-image-container">
            <img src="/images/hero.jpeg?height=400&width=500" alt="Artisan" className="heritage-image" />
          </div>
          <div className="heritage-text">
            <h2 className="heritage-title">A Tapestry of Nepalese Heritage</h2>
            <p className="heritage-paragraph">
              Rooted in rich cultural traditions of Nepal, each piece represents skilled craftsmanship passed down
              through generations.
            </p>
            <div className="heritage-stats">
              <div className="heritage-stat">
                <div className="heritage-stat-number">50+</div>
                <div className="heritage-stat-label">Artisans</div>
              </div>
              <div className="heritage-stat">
                <div className="heritage-stat-number">100%</div>
                <div className="heritage-stat-label">Handcrafted</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Heritage
