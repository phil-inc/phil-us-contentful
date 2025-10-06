import React from "react";
import { useEffect, useState } from "react";
import loadable from "@loadable/component";
import YouTube from "react-youtube";
import { AspectRatio } from "@mantine/core";

// Lazy-load the lightweight player
const LiteYouTubeEmbed = loadable(() => import("react-lite-youtube-embed"));

interface HybridYouTubeProps {
  videoId: string;
  title?: string;
}

export default function HybridYouTube({
  videoId,
  title = "YouTube video",
}: HybridYouTubeProps) {
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    // Observe for iframe loading errors (Lite version)
    const observer = new MutationObserver(() => {
      const iframe = document.querySelector<HTMLIFrameElement>(
        `iframe[src*="${videoId}"]`,
      );
      if (iframe) {
        iframe.onerror = () => {
          console.warn("Lite YouTube iframe failed, using fallback player.");
          setFallback(true);
        };
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // safety timeout: if it still doesn't load within 2s → fallback
    timer = setTimeout(() => {
      const iframe = document.querySelector(`iframe[src*="${videoId}"]`);
      if (!iframe) {
        console.warn("Timeout waiting for Lite YouTube to load — fallback.");
        setFallback(true);
      }
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [videoId]);

  if (fallback) {
    // 🔁 fallback: full YouTube player (react-youtube)
    const opts = {
      width: "100%",
      height: "100%",
      playerVars: {
        rel: 0,
        autoplay: 0,
        modestbranding: 1,
      },
    };

    return (
      <div className="youtube-fallback">
        <AspectRatio ratio={16 / 9}>
          <YouTube
            videoId={videoId}
            opts={opts}
            onError={(e) => console.error("YouTube fallback error:", e.data)}
          />
        </AspectRatio>
      </div>
    );
  }

  return (
    <div className="youtube-lite">
      <AspectRatio ratio={16 / 9}>
        <LiteYouTubeEmbed
          id={videoId}
          title={title}
          noCookie={false}
          params="rel=0"
        />
      </AspectRatio>
    </div>
  );
}
