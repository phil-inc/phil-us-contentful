import React, { useEffect, useState } from "react";
import { AspectRatio } from "@mantine/core";

// Safari-safe dynamic import
let YouTube: any = null;
if (typeof window !== "undefined") {
  YouTube = require("react-youtube").default; // IMPORTANT FIX fir safari error
}

interface YouTubeVideoProps {
  videoId: string;
  title?: string;
}

export default function YouTubeVideo({ videoId, title }: YouTubeVideoProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !YouTube) return null;

  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      rel: 0,
      autoplay: 0,
      modestbranding: 1,
      enablejsapi: 1,
      playsinline: 1,
    },
  };

  return (
    <div className="youtube-video" data-title={title || "YouTube Video"}>
      <AspectRatio ratio={16 / 9} style={{ width: "100%" }}>
        <YouTube
          videoId={videoId}
          opts={opts}
          onError={(e: any) => console.error("YouTube Error:", e.data)}
        />
      </AspectRatio>
    </div>
  );
}
