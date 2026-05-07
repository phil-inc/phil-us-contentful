import React, { useEffect, useRef, useState, useCallback } from "react";
import * as classes from "./statBanner.module.css";
import pDotsDark from "assets/images/p-dots-dark.png";

export type Stat = {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  sublabel?: string;
  highlight?: boolean;
};

type StatBannerProps = {
  label: string;
  stats: Stat[];
};

const AnimatedNumber: React.FC<{
  value: number;
  decimals?: number;
  suffix?: string;
}> = ({ value, decimals = 0, suffix }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const animate = useCallback(() => {
    if (!ref.current || hasAnimated) return;
    setHasAnimated(true);
    const duration = 1400;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const current = value * ease(t);
      if (ref.current) {
        ref.current.textContent = current.toFixed(decimals);
      }
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value, decimals, hasAnimated]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  return (
    <span className={classes.num}>
      <span ref={ref}>{(0).toFixed(decimals)}</span>
      {suffix && <small>{suffix}</small>}
    </span>
  );
};

const StatBanner: React.FC<StatBannerProps> = ({ label, stats }) => (
  <aside className={classes.banner} aria-label={label}>
    <img className={classes.pmark} src={pDotsDark} alt="" aria-hidden="true" />
    <div className={classes.label}>{label}</div>
    <div className={classes.statList}>
      {stats.map((stat, i) => (
        <div key={i} className={`${classes.stat} ${stat.highlight ? classes.highlight : ""}`}>
          <AnimatedNumber value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
          <span className={classes.lbl}>
            <strong>{stat.label}</strong>
            {stat.sublabel && <span>{stat.sublabel}</span>}
          </span>
        </div>
      ))}
    </div>
  </aside>
);

export default StatBanner;
