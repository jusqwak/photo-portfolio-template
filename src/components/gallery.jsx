import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./gallery.css";

const images = import.meta.glob('../assets/media/gallery/*.{png,jpg,jpeg}', { eager: true, as: 'url' });
const imageUrls = Object.values(images);

function GalleryItem({ src, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`gallery-item ${visible ? "visible" : ""}`}
      ref={ref}
      style={{ animationDelay: `${(index % 6) * 0.07}s` }}
    >
      <img src={src} alt={`Photo ${index + 1}`} />
    </div>
  );
}

export default function Gallery() {
  const navigate = useNavigate();

  return (
    <div className="gallery-page">
      <header className="gallery-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
        <div className="gallery-header-text">
          <p className="gallery-eyebrow">All Work</p>
          <h1 className="gallery-title">Gallery</h1>
        </div>
      </header>

      <div className="gallery-grid">
        {imageUrls.map((src, i) => (
          <GalleryItem key={i} src={src} index={i} />
        ))}
      </div>
    </div>
  );
}