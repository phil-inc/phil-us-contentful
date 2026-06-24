import React from "react";

export const VideoBandSection: React.FC = () => (
  <section id="video" className="band video-section" data-screen-label="03 Video">
    <div className="xl-container">
      <div className="video-band">
        <div className="vb-copy">
          <h2>Discover the DTP Possibilities with PHIL Direct</h2>
          <p>
            Maximize patient access, affordability, and adherence while
            safeguarding commercial performance with PHIL Direct.
          </p>
        </div>
        <a
          className="video-thumb"
          href="https://www.youtube.com/watch?v=WmuyIuwHkgM"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Watch the PHIL Direct video"
        >
          <img
            src="https://img.youtube.com/vi/WmuyIuwHkgM/maxresdefault.jpg"
            alt="PHIL Direct overview video"
            width={1280}
            height={720}
            loading="lazy"
          />
          <span className="play-overlay" aria-hidden="true">
            <span className="play-btn">
              <svg viewBox="0 0 24 24">
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            </span>
          </span>
        </a>
      </div>
    </div>
  </section>
);
