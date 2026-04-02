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


interface CircleData {
  label: string;
  desc: string;
  bgVariant: 'light' | 'teal' | 'svg';
  logo: string;
}

const CIRCUMFERENCE = 2 * Math.PI * 42; // ≈ 263.8


const CIRCLES: CircleData[] = [
  { label: 'e-Prescribing', desc: 'Familiar workflow with existing EMRs', bgVariant: 'light', logo: ePrescribingLogo },
  { label: 'Fast Enrollment', desc: '< 1-minute patient signup', bgVariant: 'teal', logo: fastEnrollmentLogo },
  { label: 'PA Submission', desc: 'Pre-filled forms for fewer clicks', bgVariant: 'svg', logo: paSubmissionLogo },
  { label: 'Covered Dispenses', desc: 'Broad network maximizes coverage', bgVariant: 'svg', logo: coveredDispensesLogo },
  { label: 'Transparent Costs', desc: 'Clear coverage and cost details', bgVariant: 'light', logo: transparentCostsLogo },
  { label: 'Home Delivery', desc: 'Scheduled delivery options', bgVariant: 'teal', logo: homeDeliveryLogo },
  { label: 'Simple Refills', desc: 'Easy enrollment in patient refills', bgVariant: 'light', logo: simpleRefillsLogo },
];

//  Scroll lock / unlock

function lockScroll(): number {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.overflow = 'hidden';
  if (scrollbarWidth) document.body.style.paddingRight = `${scrollbarWidth}px`;
  return window.scrollY;
}

function unlockScroll(_savedY: number) {
  document.documentElement.style.overflow = '';
  document.body.style.paddingRight = '';
}

// Total accumulated wheel deltaY (px) to drive animation from 0 → 1
const WHEEL_TOTAL = 4000; // The less the number, the faster the animation

//  Main component
type Props = {
  mobileImage?: TAsset;
};

export default function ScrollCircleAnimation({ mobileImage }: Props) {
  const isMobile = useDeviceType('maxSm');
  const isUsingMobileFallback = isMobile && Boolean(mobileImage);
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null); // kept for cleanup only
  const lastScrollYRef = useRef<number>(0);

  const progressRef = useRef(0);
  const lockedRef = useRef(false);   
  const savedScrollY = useRef(0);
  const centerTriggered = useRef(false); 
  const cooldownRef = useRef(false);   
  const hasCompletedRef = useRef(false); 

  const [scrollProgress, setScrollProgress] = useState(0);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    if (isUsingMobileFallback) return;
    const el = sectionRef.current;
    if (!el) return;
    lastScrollYRef.current = window.scrollY;

    // ── Phase A: detect section centre reaching viewport centre 
    const handleScroll = () => {
      if (lockedRef.current || cooldownRef.current || hasCompletedRef.current) return;

      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportH / 2;
      const dist = Math.abs(sectionCenter - viewportCenter);

      // Reset trigger when section is far from centre (user scrolled away)
      if (dist > rect.height * 0.4) {
        centerTriggered.current = false;
        if (progressRef.current > 0) {
          progressRef.current = 0;
          setScrollProgress(0);
        }
      }

      // Lock when section centre crosses viewport centre while scrolling down
      const threshold = Math.max(20, rect.height * 0.05);
      if (!centerTriggered.current && isScrollingDown && dist < threshold) {
        centerTriggered.current = true;
        lockedRef.current = true;
        savedScrollY.current = lockScroll();
      }
    };

    //Phase B: wheel drives animation while locked
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
        // Animation complete — fade out rings, hold for 0.1s, then unlock
        hasCompletedRef.current = true;
        setAnimationDone(true);

        setTimeout(() => {
          cooldownRef.current = true;
          lockedRef.current = false;
          unlockScroll(savedScrollY.current);
          setTimeout(() => { cooldownRef.current = false; }, 100);
        }, 100);
      } else if (next <= 0 && delta < 0) {
        // Animation incomplete, user scrolling up past 0 — unlock and re-arm
        cooldownRef.current = true;
        lockedRef.current = false;
        centerTriggered.current = false;
        unlockScroll(savedScrollY.current);
        setTimeout(() => { cooldownRef.current = false; }, 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Must be non-passive so we can call preventDefault inside handleWheel
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (document.documentElement.style.overflow === 'hidden') {
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
                  <div className={styles.circleItem}>
                    <div
                      className={[
                        styles.circleRingWrap,
                        isActive ? styles.active : '',
                      ].join(' ')}
                    >
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

                    <div className={styles.circleLabel}>{circle.label}</div>
                    <div className={styles.circleDesc}>{circle.desc}</div>
                  </div>

                  {i < CIRCLES.length - 1 && (
                    <div className={[styles.arrowWrap, isDone ? styles.lit : ''].join(' ')}>
                      <img src={arrowConnector} alt="" aria-hidden className={styles.arrowIcon} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className={styles.footerBadge}>
            <p>End-to-end data &amp; insights at the script, provider, payer, and program level</p>
          </div>
        </div>
      </div>
    </section>
  );
}
