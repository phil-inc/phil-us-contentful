import React, { useEffect, useRef } from "react";
import { Link } from "gatsby";

export const FinalCtaSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll(".endcta-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("endcta-reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="endcta" id="cta" data-screen-label="09 Call to Action">
      <div className="endcta-bg">
        <div className="xl-container endcta-row endcta-reveal">
          <div className="endcta-copy">
            <h2 className="endcta-title">Direct-to-Patient Success,<br />Solved</h2>
            <p className="endcta-body">
              Take a tour of the PHIL Direct-to-Patient platform today and
              discover how our team of experts can build a tailored DTP program
              that maximizes access, affordability, and adherence for your
              patients.
            </p>
          </div>
          <div className="endcta-ctas">
            <Link className="endcta-btn" to="/demo/">
              Book Demo
              <svg
                className="endcta-arrow"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 9h12m-4-4 4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
