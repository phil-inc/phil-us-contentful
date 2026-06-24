import React from 'react';

export const SupportSection: React.FC = () => (

<section id="support" className="band glow glow-tl glow-br" data-screen-label="07 Patient & Provider Support">
  <div className="xl-container">
    <div className="section-head section-head--center">
      <h2>Your Partner in Patient Support and Provider Engagement</h2>
      <p className="lead lead--full">We believe the best experience occurs when dedicated human-first engagement and intelligent technology work together to deliver better, faster care.</p>
    </div>

    <div className="support-grid">
      <article className="support-tile patients">
        <div className="st-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg></div>
        <h3>Patient Support Team</h3>
        <p className="st-desc">Provides hands-on assistance throughout the entire medication access journey, offering live support via phone and email to help patients navigate coverage options, address questions, and stay informed about their prescriptions, improving patient education, trust, and satisfaction.</p>
      </article>
      <div className="support-connector" aria-hidden="true">
        <span className="sc-line left"></span>
        <span className="sc-line right"></span>
        <span className="sc-orbit o2"></span>
        <span className="sc-orbit o1"></span>
        <span className="sc-ring sc-r1"></span>
        <span className="sc-ring sc-r2"></span>
        <span className="sc-ring sc-r3"></span>
        <span className="sc-ring sc-r4"></span>
        <span className="sc-core"><svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.6-.8L3 21l1.9-5.5A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" /><circle cx="9" cy="11.5" r="0.6" /><circle cx="12.5" cy="11.5" r="0.6" /><circle cx="16" cy="11.5" r="0.6" /></svg></span>
      </div>
      <article className="support-tile providers">
        <div className="st-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 3h6v3H9z" /><path d="M5 6h14v15H5z" /><path d="M12 11v6M9 14h6" /></svg></div>
        <h3>HCP Engagement Team</h3>
        <p className="st-desc">Supports healthcare providers by simplifying the prescription process through proactive outreach, tailored communication, and clear education on program workflows, reducing administrative burden and strengthening office relationships by meeting each provider's unique needs.</p>
      </article>
    </div>

    <div className="reviews-head reviews-head--center">
      <h3>What PHIL Patients &amp; Providers Say</h3>
    </div>
    <div className="review-grid">
      <article className="review-card r1">
        <p className="rc-tag">Patient Review</p>
        <span className="rc-stars">
          <span><svg viewBox="0 0 24 24"><path d="M12 2l2.6 6.6L22 9.3l-5 4.6 1.3 7.1L12 17.8 5.7 21l1.3-7.1-5-4.6 7.4-.7z" /></svg></span>
          <span><svg viewBox="0 0 24 24"><path d="M12 2l2.6 6.6L22 9.3l-5 4.6 1.3 7.1L12 17.8 5.7 21l1.3-7.1-5-4.6 7.4-.7z" /></svg></span>
          <span><svg viewBox="0 0 24 24"><path d="M12 2l2.6 6.6L22 9.3l-5 4.6 1.3 7.1L12 17.8 5.7 21l1.3-7.1-5-4.6 7.4-.7z" /></svg></span>
          <span><svg viewBox="0 0 24 24"><path d="M12 2l2.6 6.6L22 9.3l-5 4.6 1.3 7.1L12 17.8 5.7 21l1.3-7.1-5-4.6 7.4-.7z" /></svg></span>
          <span><svg viewBox="0 0 24 24"><path d="M12 2l2.6 6.6L22 9.3l-5 4.6 1.3 7.1L12 17.8 5.7 21l1.3-7.1-5-4.6 7.4-.7z" /></svg></span>
        </span>
        <blockquote>&ldquo;I wasn&rsquo;t able to afford a medication that helped me. My doctor found it through PHILRx, and I could continually purchase 3 months of this prescription at a time to receive a HUGE discount. It changed my life.&rdquo;</blockquote>
        <p className="rc-attr">Carla R., PHIL Patient</p>
      </article>
      <article className="review-card r2">
        <p className="rc-tag">Provider Review</p>
        <span className="rc-stars">
          <span><svg viewBox="0 0 24 24"><path d="M12 2l2.6 6.6L22 9.3l-5 4.6 1.3 7.1L12 17.8 5.7 21l1.3-7.1-5-4.6 7.4-.7z" /></svg></span>
          <span><svg viewBox="0 0 24 24"><path d="M12 2l2.6 6.6L22 9.3l-5 4.6 1.3 7.1L12 17.8 5.7 21l1.3-7.1-5-4.6 7.4-.7z" /></svg></span>
          <span><svg viewBox="0 0 24 24"><path d="M12 2l2.6 6.6L22 9.3l-5 4.6 1.3 7.1L12 17.8 5.7 21l1.3-7.1-5-4.6 7.4-.7z" /></svg></span>
          <span><svg viewBox="0 0 24 24"><path d="M12 2l2.6 6.6L22 9.3l-5 4.6 1.3 7.1L12 17.8 5.7 21l1.3-7.1-5-4.6 7.4-.7z" /></svg></span>
          <span><svg viewBox="0 0 24 24"><path d="M12 2l2.6 6.6L22 9.3l-5 4.6 1.3 7.1L12 17.8 5.7 21l1.3-7.1-5-4.6 7.4-.7z" /></svg></span>
        </span>
        <blockquote>&ldquo;PHILRx provides great support for patients, and convenient ways for providers to reach out.&rdquo;</blockquote>
        <p className="rc-attr">Elizabeth R., Healthcare Provider</p>
      </article>
      <article className="review-card r3">
        <p className="rc-tag">Patient Review</p>
        <span className="rc-stars">
          <span><svg viewBox="0 0 24 24"><path d="M12 2l2.6 6.6L22 9.3l-5 4.6 1.3 7.1L12 17.8 5.7 21l1.3-7.1-5-4.6 7.4-.7z" /></svg></span>
          <span><svg viewBox="0 0 24 24"><path d="M12 2l2.6 6.6L22 9.3l-5 4.6 1.3 7.1L12 17.8 5.7 21l1.3-7.1-5-4.6 7.4-.7z" /></svg></span>
          <span><svg viewBox="0 0 24 24"><path d="M12 2l2.6 6.6L22 9.3l-5 4.6 1.3 7.1L12 17.8 5.7 21l1.3-7.1-5-4.6 7.4-.7z" /></svg></span>
          <span><svg viewBox="0 0 24 24"><path d="M12 2l2.6 6.6L22 9.3l-5 4.6 1.3 7.1L12 17.8 5.7 21l1.3-7.1-5-4.6 7.4-.7z" /></svg></span>
          <span><svg viewBox="0 0 24 24"><path d="M12 2l2.6 6.6L22 9.3l-5 4.6 1.3 7.1L12 17.8 5.7 21l1.3-7.1-5-4.6 7.4-.7z" /></svg></span>
        </span>
        <blockquote>&ldquo;I felt that my needs were being considered from the very beginning. That was so refreshing to me because it was out of the ordinary for a company to express such consideration, especially for a new customer like myself!&rdquo;</blockquote>
        <p className="rc-attr">Dawn M., PHIL Patient</p>
      </article>
    </div>
    
    <div className="trustpilot-bar">
      <div
        className="trustpilot-widget"
        data-locale="en-US"
        data-template-id="5406e65db0d04a09e042d5fc"
        data-businessunit-id="60e5837e95cb800001e58b14"
        data-style-height="28px"
        data-style-width="100%"
        data-token="27482d6b-f7e5-4cc9-aff3-d03b20ea51d0"
        dangerouslySetInnerHTML={{
          __html:
            '<a href="https://www.trustpilot.com/review/phil.us" target="_blank" rel="noopener">Trustpilot</a>',
        }}
      />
    </div>
    
  </div>
</section>
);
