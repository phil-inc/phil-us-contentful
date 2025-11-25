import React, { useState, useEffect, Suspense } from "react";
import { AspectRatio } from "@mantine/core";
import LoadingIndicator from "components/common/LoadingIndicator/LoadingIndicator";

// Dynamic import for react-youtube (client-side only)
const YouTube = React.lazy(() => import("react-youtube"));

interface YouTubeVideoProps {
  videoId: string;
  title?: string;
}

export default function YouTubeVideo({
  videoId,
  title = "YouTube video",
}: YouTubeVideoProps) {
  const [isClient, setIsClient] = useState(false);

  // Ensure component only renders on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <LoadingIndicator size="xl" />;
  }

  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      rel: 0,
      autoplay: 0,
      modestbranding: 1,
      enablejsapi: 1,
      playsinline: 1, // Important for Safari/iOS
    },
  };

  return (
    <div className="youtube-video" data-title={title}>
      <AspectRatio ratio={16 / 9} style={{ width: "100%" }}>
        <Suspense fallback={<LoadingIndicator size="xl" />}>
          <YouTube
            videoId={videoId}
            opts={opts}
            onError={(e: any) => console.error("YouTube player error:", e.data)}
          />
        </Suspense>
      </AspectRatio>
    </div>
  );
}
