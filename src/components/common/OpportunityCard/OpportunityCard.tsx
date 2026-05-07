import React, { useEffect, useRef, useState, useCallback } from "react";
import * as classes from "./opportunityCard.module.css";

type OpportunityCardProps = {
  tag: string;
  title: string;
  description: string;
  visual?: React.ReactNode;
  spotlight?: boolean;
  bigNumber?: { value: number; suffix: string; decimals?: number };
};

const AnimatedBigNumber: React.FC<{
  value: number;
  suffix: string;
  decimals?: number;
}> = ({ value, suffix, decimals = 0 }) => {
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
      if (ref.current) ref.current.textContent = current.toFixed(decimals);
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
    <div className={classes.big}>
      <span ref={ref}>{(0).toFixed(decimals)}</span>
      <small>{suffix}</small>
    </div>
  );
};

const OpportunityCard: React.FC<OpportunityCardProps> = ({
  tag,
  title,
  description,
  visual,
  spotlight,
  bigNumber,
}) => (
  <article className={`${classes.card} ${spotlight ? classes.spotlight : ""}`}>
    {visual && <div className={classes.vis}>{visual}</div>}
    {spotlight && bigNumber && (
      <AnimatedBigNumber
        value={bigNumber.value}
        suffix={bigNumber.suffix}
        decimals={bigNumber.decimals}
      />
    )}
    <p className={classes.tag}>{tag}</p>
    <h3 className={classes.title}>{title}</h3>
    <p className={classes.desc}>{description}</p>
  </article>
);

export default OpportunityCard;
