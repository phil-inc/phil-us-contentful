declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const isBrowser = typeof window !== "undefined";

export const trackGaEvent = (
  action: string,
  category: string,
  label?: string
) => {
  if (!isBrowser || typeof window.gtag !== "function") {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.log("[GA event]", { action, category, label });
    }
    return;
  }

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
  });
};
