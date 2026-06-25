import React, { useState } from "react";

export const VideoBandSection: React.FC = () => {
  const [playing, setPlaying] = useState(false);

  return (
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
          {playing ? (
            <div className="video-thumb">
              <iframe
                className="video-iframe"
                src="https://www.youtube-nocookie.com/embed/WmuyIuwHkgM?rel=0&modestbranding=1&autoplay=1"
                title="PHIL Direct overview video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          ) : (
            <button
              type="button"
              className="video-thumb"
              onClick={() => setPlaying(true)}
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
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
