import React, { useEffect, useRef } from 'react';
import videoThumb from '../../../pharma/assets/phil-yt-thumbnail.png';

const VIDEO_ID = 'ZGCzJwhano4';

export const VideoBandSection: React.FC = () => {
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = copyRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('vb-reveal-in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="band video-band-section" data-screen-label="08 Video Our Solution">
      <div className="xl-container">
        <div className="video-band">
          <div ref={copyRef} className="vb-copy vb-reveal">
            <h2>Create a Path to Commercial Success</h2>
            <p>Take a tour of the PHIL platform today and discover how our team of experts can build a tailored access program that supports your brand success.</p>
          </div>
          <a
            className="video-thumb"
            href={`https://www.youtube.com/watch?v=${VIDEO_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch the PHIL platform video"
          >
            <img src={videoThumb} alt="PHIL platform video" />
            <span className="play-overlay" aria-hidden="true"><span className="play-btn"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7L8 5z" /></svg></span></span>
          </a>
        </div>
      </div>
    </section>
  );
};
