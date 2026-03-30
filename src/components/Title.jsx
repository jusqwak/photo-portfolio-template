import { useEffect, useState } from "react";
import "./Title.css";
import { useNavigate } from "react-router-dom";

const photos = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=80",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1600&q=80",
];

export default function TitleFront() {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentPhoto((prev) => (prev + 1) % photos.length);
        setTransitioning(false);
      }, 800);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero">
      <div
        className={`bg-image ${transitioning ? "fade" : ""}`}
        style={{ backgroundImage: `url(${photos[currentPhoto]})` }}
      />
      <div className="grain" />
      <div className="vignette" />

      <div className={`content ${loaded ? "visible" : ""}`}>
        <p className="eyebrow">Photography Portfolio</p>

        <div className="name-wrapper">
          <span className="name">
            First <span className="name-italic">Last</span>
          </span>
        </div>

        <div className="divider" />

        <p className="tagline">Yap Yap Yap</p>

        <a className="cta" onClick={() => navigate("/gallery")}>View Work</a>
      </div>

      <div className="dots">
        {photos.map((_, i) => (
          <div
            key={i}
            className={`dot ${i === currentPhoto ? "active" : ""}`}
            onClick={() => setCurrentPhoto(i)}
          />
        ))}
      </div>

      <div className="scroll-hint">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </div>
  );
}