import React, { useEffect, useRef, useState } from 'react';
import Asset from 'components/common/Asset/Asset';
import useDeviceType from 'hooks/useView';
import { TAsset } from 'types/asset';
import * as styles from './ScrollCircleAnimation.module.css';
import ePrescribingLogo from '../../assets/scroll-circle-animation/e-prescribing.svg';
import fastEnrollmentLogo from '../../assets/scroll-circle-animation/fast-enrollment.svg';
import paSubmissionLogo from '../../assets/scroll-circle-animation/pa-submission.svg';
import coveredDispensesLogo from '../../assets/scroll-circle-animation/covered-dispenses.svg';
import transparentCostsLogo from '../../assets/scroll-circle-animation/transparent-costs.svg';
import homeDeliveryLogo from '../../assets/scroll-circle-animation/home-delivery.svg';
import simpleRefillsLogo from '../../assets/scroll-circle-animation/simple-refills.svg';
import arrowConnector from '../../assets/scroll-circle-animation/arrow-connector.svg';

// ─── Circle data ──────────────────────────────────────────────────────────────

interface CircleData {
  label: string;
  desc: string;
  bgVariant: 'light' | 'teal' | 'svg';
  logo: string;
}

const CIRCUMFERENCE = 2 * Math.PI * 42; // ≈ 263.8

// ─── Circle definitions ───────────────────────────────────────────────────────

const CIRCLES: CircleData[] = [
  { label: 'e-Prescribing', desc: 'Familiar workflow with existing EMRs', bgVariant: 'light', logo: ePrescribingLogo },
  { label: 'Fast Enrollment', desc: '< 1-minute patient signup', bgVariant: 'teal', logo: fastEnrollmentLogo },
  { label: 'PA Submission', desc: 'Pre-filled forms for fewer clicks', bgVariant: 'svg', logo: paSubmissionLogo },
  { label: 'Covered Dispenses', desc: 'Broad network maximizes coverage', bgVariant: 'svg', logo: coveredDispensesLogo },
  { label: 'Transparent Costs', desc: 'Clear coverage and cost details', bgVariant: 'light', logo: transparentCostsLogo },
  { label: 'Home Delivery', desc: 'Scheduled delivery options', bgVariant: 'teal', logo: homeDeliveryLogo },
  { label: 'Simple Refills', desc: 'Easy enrollment in patient refills', bgVariant: 'light', logo: simpleRefillsLogo },
];

// ─── Scroll lock / unlock ─────────────────────────────────────────────────────

function lockScroll(): number {
  const y = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${y}px`;
  document.body.style.width = '100%';
  document.body.style.overflowY = 'scroll';
  return y;
}

function unlockScroll(savedY: number) {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  document.body.style.overflowY = '';
  window.scrollTo({ top: savedY, behavior: 'instant' as ScrollBehavior });
}

// Total accumulated wheel deltaY (px) to drive animation from 0 → 1
const WHEEL_TOTAL = 6000;

// ─── Main component ───────────────────────────────────────────────────────────

type Props = {
  mobileImage?: TAsset;
};

export default function ScrollCircleAnimation({ mobileImage }: Props) {
  const isMobile = useDeviceType('maxSm');
  const isUsingMobileFallback = isMobile && Boolean(mobileImage);
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastScrollYRef = useRef<number>(0);

  // Authoritative progress (0–1). Kept as a ref so wheel handler always
  // reads the latest value without stale-closure issues.
  const progressRef = useRef(0);
  const lockedRef = useRef(false);      // is scroll currently locked?
  const savedScrollY = useRef(0);
  const centerTriggered = useRef(false); // has lock fired for this approach?
  const cooldownRef = useRef(false);    // suppress re-lock after unlock (Safari fix)
  const hasCompletedRef = useRef(false); // animation played once — never re-trigger

  // React state drives the render; synced from progressRef inside events.
  const [scrollProgress, setScrollProgress] = useState(0);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    if (isUsingMobileFallback) return;
    const el = sectionRef.current;
    if (!el) return;
    lastScrollYRef.current = window.scrollY;

    // ── Phase A: detect section centre reaching viewport centre ────────────
    const handleScroll = () => {
      if (lockedRef.current || cooldownRef.current || hasCompletedRef.current) return;
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const rect = el.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportH / 2;
        const dist = Math.abs(sectionCenter - viewportCenter);

        // Fire lock only when scrolling DOWN into the section
        const threshold = Math.max(40, rect.height * 0.1);
        if (!centerTriggered.current && isScrollingDown && dist < threshold) {
          centerTriggered.current = true;
          lockedRef.current = true;
          savedScrollY.current = lockScroll();
        }
      });
    };

    // ── Phase B: wheel drives animation while locked ───────────────────────
    const handleWheel = (e: WheelEvent) => {
      if (!lockedRef.current) return;
      e.preventDefault(); // suppress any browser scroll while locked

      const delta = e.deltaY / WHEEL_TOTAL;
      const next = Math.max(0, Math.min(1, progressRef.current + delta));
      progressRef.current = next;

      // Batch state update with next paint frame (smoother in Safari)
      requestAnimationFrame(() => {
        setScrollProgress(next);
      });

      if (next >= 1 && !hasCompletedRef.current) {
        // Animation complete — fade out rings, hold for 2s, then unlock
        hasCompletedRef.current = true;
        setAnimationDone(true);

        setTimeout(() => {
          cooldownRef.current = true;
          lockedRef.current = false;
          unlockScroll(savedScrollY.current);
          setTimeout(() => { cooldownRef.current = false; }, 500);
        }, 500);
      } else if (next <= 0 && delta < 0) {
        // User scrolled back to start — unlock and allow scrolling up
        cooldownRef.current = true;
        lockedRef.current = false;
        unlockScroll(savedScrollY.current);
        setTimeout(() => { cooldownRef.current = false; }, 500);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Must be non-passive so we can call preventDefault inside handleWheel
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (document.body.style.position === 'fixed') {
        unlockScroll(savedScrollY.current);
      }
    };
  }, [isUsingMobileFallback]);

  if (isMobile) {
    return mobileImage ? (
      <section className={styles.mobileFallback}>
        <Asset asset={mobileImage} />
      </section>
    ) : null;
  }

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.scaleWrap}>
        <div className={styles.card}>

          {/* ── Header pills ── */}
          <div className={styles.headerPills}>
            <div className={styles.pill}>Digital Hub Services</div>
            <div className={styles.pill}>Integrated Dispense Network</div>
          </div>

          {/* ── Circles row ── */}
          <div className={styles.circlesRow}>
            {CIRCLES.map((circle, i) => {
              const N = CIRCLES.length;
              // Each circle gets an equal 1/N slice of the overall progress
              const circleProgress = Math.max(0, Math.min(1, scrollProgress * N - i));
              const isActive = circleProgress > 0 && circleProgress < 1;
              const isDone = circleProgress >= 1;
              const ringOffset = CIRCUMFERENCE * (1 - circleProgress);

              return (
                <React.Fragment key={i}>
                  {/* Circle item */}
                  <div className={styles.circleItem}>
                    {/* Ring + icon */}
                    <div
                      className={[
                        styles.circleRingWrap,
                        isActive ? styles.active : '',
                      ].join(' ')}
                    >
                      {/* Progress ring SVG */}
                      <svg
                        className={[
                          styles.progressRingSvg,
                          animationDone ? styles.hidden : '',
                        ].join(' ')}
                        viewBox="0 0 88 88"
                      >
                        <circle className={styles.ringTrack} cx="44" cy="44" r="42" />
                        <circle
                          className={styles.ringFill}
                          cx="44"
                          cy="44"
                          r="42"
                          style={{ strokeDashoffset: ringOffset }}
                        />
                      </svg>

                      {/* Icon circle */}
                      {circle.bgVariant === 'svg' ? (
                        <div
                          className={[
                            styles.iconCircle,
                            isActive ? styles.active : '',
                            isDone ? styles.done : '',
                          ].join(' ')}
                          style={{ background: 'transparent' }}
                        >
                          <img src={circle.logo} alt="" aria-hidden className={styles.fullSizeLogo} />
                        </div>
                      ) : (
                        <div
                          className={[
                            styles.iconCircle,
                            circle.bgVariant === 'teal' ? styles.tealBg : styles.lightBg,
                            isActive ? styles.active : '',
                            isDone ? styles.done : '',
                          ].join(' ')}
                        >
                          <img src={circle.logo} alt="" aria-hidden className={styles.innerLogo} />
                        </div>
                      )}
                    </div>

                    {/* Text */}
                    <div className={styles.circleLabel}>{circle.label}</div>
                    <div className={styles.circleDesc}>{circle.desc}</div>
                  </div>

                  {/* Arrow connector between circles */}
                  {i < CIRCLES.length - 1 && (
                    <div className={[styles.arrowWrap, isDone ? styles.lit : ''].join(' ')}>
                      <img src={arrowConnector} alt="" aria-hidden className={styles.arrowIcon} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* ── Footer badge ── */}
          <div className={styles.footerBadge}>
            <p>End-to-end data &amp; insights at the script, provider, payer, and program level</p>
          </div>
        </div>
      </div>
    </section>
  );
}
