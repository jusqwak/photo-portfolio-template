import { useEffect, useRef, useState } from "react";
import "./feature.css";

const images = import.meta.glob('../assets/media/*.{png,jpg}', { eager: true, as: 'url' });
const videos = import.meta.glob('../assets/media/*.{mp4,webm,MOV}', { eager: true, as: 'url' });

const imageUrls = Object.values(images);
const videoUrls = Object.values(videos);

const photos = [
  { id: 1, src: imageUrls[0], label: "Feature 1", desc: "Tagline 1", year: "2024", type: "image" },
  { id: 2, src: videoUrls[0], label: "Feature 2", desc: "Tagline 2", year: "2024", type: "video" },
  { id: 3, src: imageUrls[1], label: "Feature 3", desc: "Tagline 3", year: "2023", type: "image" },
  { id: 4, src: videoUrls[1], label: "Feature 4", desc: "Tagline 4", year: "2023", type: "video" },
  { id: 5, src: imageUrls[2], label: "Feature 5", desc: "Tagline 5", year: "2023", type: "image" },
];

function MediaBlock({ src, label, type }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (type !== "video" || !videoRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [type]);

  if (type === "video") {
    return (
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        aria-label={label}
        className="row-media"
      />
    );
  }

  return <img src={src} alt={label} className="row-media" />;
}

function FeatureRow({ photo, index }) {
  const rowRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`feature-row ${visible ? "visible" : ""} ${index % 2 === 0 ? "row-left" : "row-right"}`}
      ref={rowRef}
    >
      <div className="row-img-wrap">
        <MediaBlock src={photo.src} label={photo.label} type={photo.type} />
        {photo.type === "video" && <span className="video-badge">▶</span>}
      </div>
      <div className="row-info">
        <span className="row-number">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="row-label">{photo.label}</h3>
        <p className="row-desc">{photo.desc}</p>
        <span className="row-year">{photo.year}</span>
      </div>
    </div>
  );
}

export default function Gallery() {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.2 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="feature-section">
      <div className={`feature-header ${headerVisible ? "visible" : ""}`} ref={headerRef}>
        <p className="feature-eyebrow">Featured Work</p>
        <h2 className="feature-title">Portfolio</h2>
        <div className="header-line" />
      </div>

      <div className="feature-rows">
        {photos.map((photo, i) => (
          <FeatureRow key={photo.id} photo={photo} index={i} />
        ))}
      </div>
    </section>
  );
}