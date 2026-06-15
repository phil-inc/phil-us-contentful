import React from 'react';

export const VideoBandSection: React.FC = () => (

<section className="band" style={{background: 'linear-gradient(135deg, #00615E 0%, #00827E 45%, #5ABEA4 100%)', padding: '78px 0'}} data-screen-label="08 Video Our Solution">
  <div className="xl-container">
    <div className="video-band">
      <div className="vb-copy">
        <h2>Create a Path to Commercial Success</h2>
        <p>Take a tour of the PHIL platform today and discover how our team of experts can build a tailored access program that supports your brand success.</p>
      </div>
      <a className="video-thumb" href="https://www.youtube.com/watch?v=7Oyyt-tjrsE" target="_blank" rel="noopener" aria-label="Watch the PHIL platform video">
        <img src="https://img.youtube.com/vi/7Oyyt-tjrsE/maxresdefault.jpg" alt="PHIL platform video" />
        <span className="play-overlay" aria-hidden="true"><span className="play-btn"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7L8 5z" /></svg></span></span>
      </a>
    </div>
  </div>
</section>
);
