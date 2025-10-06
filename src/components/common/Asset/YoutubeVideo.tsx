import React from "react";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { AspectRatio } from "@mantine/core";


import LoadingIndicator from "components/common/LoadingIndicator/LoadingIndicator";
// const LiteYouTubeEmbed = loadable(() => import("react-lite-youtube-embed"));

interface YouTubeVideoProps {
  videoId: string;
  title?: string;
}

export default function YouTubeVideo({
  videoId,
  title = "YouTube video",
}: YouTubeVideoProps) {
  const [isYtReady, setIsYtReady] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    timer = setTimeout(() => {
      setIsYtReady(true); // Wait 2 seconds
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [videoId]);

  if (isYtReady) {
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

  return <LoadingIndicator size="xl" />;
}
