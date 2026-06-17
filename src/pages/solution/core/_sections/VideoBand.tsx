import React, { useState } from 'react';

const VIDEO_ID = '7Oyyt-tjrsE';

export const VideoBandSection: React.FC = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="band video-band-section" data-screen-label="08 Video Our Solution">
      <div className="xl-container">
        <div className="video-band">
          <div className="vb-copy">
            <h2>Create a Path to Commercial Success</h2>
            <p>Take a tour of the PHIL platform today and discover how our team of experts can build a tailored access program that supports your brand success.</p>
          </div>
          {playing ? (
            <div className="video-thumb video-thumb--playing">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0&autoplay=1`}
                title="PHIL platform video"
                loading="lazy"
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
              aria-label="Play the PHIL platform video"
            >
              <img src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`} alt="PHIL platform video" />
              <span className="play-overlay" aria-hidden="true"><span className="play-btn"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7L8 5z" /></svg></span></span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
