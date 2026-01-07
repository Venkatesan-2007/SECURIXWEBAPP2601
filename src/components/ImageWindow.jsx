import React, { useEffect, useRef } from 'react';

export default function ImageWindow() {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);

  // Default images for the gallery
  const images = [
    {
      src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      alt: "Security Infrastructure",
      title: "Advanced Security Infrastructure"
    },
    {
      src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
      alt: "Network Security",
      title: "Enterprise Network Security"
    },
    {
      src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
      alt: "Data Protection",
      title: "Data Protection Systems"
    },
    {
      src: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=800&q=80",
      alt: "Cloud Security",
      title: "Cloud Security Solutions"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Staggered animation for each image
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 200);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all images
    imageRefs.current.forEach((imgRef) => {
      if (imgRef) observer.observe(imgRef);
    });

    return () => {
      imageRefs.current.forEach((imgRef) => {
        if (imgRef) observer.unobserve(imgRef);
      });
    };
  }, []);

  return (
    <section className="image-gallery-section" style={{ padding: '80px 0', background: 'var(--white)' }}>
      <div className="page-container">
        <div className="section-header" data-animate="gallery-header">
          <div className="section-subtitle">Our Technology</div>
          <h2>Cutting-Edge Security Solutions</h2>
          <p className="section-description">
            Advanced tools and technologies powering our security infrastructure
          </p>
        </div>
        
        <div 
          ref={containerRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginTop: '48px'
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              ref={(el) => (imageRefs.current[index] = el)}
              style={{
                position: 'relative',
                borderRadius: 'var(--border-radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                opacity: 0,
                transform: 'translateY(50px) scale(0.9)',
                cursor: 'pointer',
                transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                
                // Show caption
                const caption = e.currentTarget.querySelector('.image-caption');
                if (caption) {
                  caption.style.opacity = '1';
                  caption.style.transform = 'translateY(0)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                
                // Hide caption
                const caption = e.currentTarget.querySelector('.image-caption');
                if (caption) {
                  caption.style.opacity = '0';
                  caption.style.transform = 'translateY(100%)';
                }
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover',
                  display: 'block'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.style.cssText = `
                    width: 100%;
                    height: 250px;
                    background: var(--gradient-primary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 600;
                    font-size: 1.2rem;
                    text-align: center;
                    padding: 20px;
                  `;
                  fallback.textContent = image.title;
                  e.target.parentNode.appendChild(fallback);
                }}
              />
              <div
                className="image-caption"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '20px',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                  color: 'white',
                  opacity: 0,
                  transform: 'translateY(100%)',
                  transition: 'all 0.3s ease'
                }}
              >
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>{image.title}</h3>
                <p style={{ margin: '8px 0 0', fontSize: '0.9rem', opacity: 0.9 }}>{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}