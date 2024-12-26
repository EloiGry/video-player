import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { trpc } from "@/trpc/client";
import { Video } from "@/types/video";

export function useVideoViews(video: Video) {
  const [viewCount, setViewCount] = useState(video?.watchCount);
  const queryClient = useQueryClient();

  const { mutateAsync: incrementViews } = trpc.video.incrementViews.useMutation();

  // Update the view count when the video data changes
  useEffect(() => {
    if (video && video.watchCount !== viewCount) {
      setViewCount(video.watchCount);
    }
  }, [video, viewCount]);

  // Function to increment the view count of a specific video
  const incrementView = async (videoId: string) => {
    try {
      const updatedViewCount = await incrementViews({ id: videoId });

      setViewCount(Number(updatedViewCount));

      // Update the cached data for the specific video in the query client
      queryClient.setQueryData(['video', videoId], (oldData: Video) => {
        return oldData ? { ...oldData, watchCount: updatedViewCount } : oldData;
      });

      // Update the cached list of all videos with the new view count
      queryClient.setQueryData(['videos'], (oldData: Video[]) => {
        return oldData?.map((v: Video) =>
          v.id === videoId ? { ...v, watchCount: updatedViewCount } : v
        );
      });

      queryClient.invalidateQueries(['videos'] as any);

    } catch (error) {
      console.error("Error incrementing views:", error);
    }
  };

  return { viewCount, incrementView };
}
