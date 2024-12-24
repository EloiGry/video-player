import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { trpc } from "@/trpc/client";
import { Video } from "@/types/video";

export function useVideoViews(video: Video) {
  const [viewCount, setViewCount] = useState(video?.watchCount);
  const queryClient = useQueryClient();
  const { mutateAsync: incrementViews } = trpc.video.incrementViews.useMutation();

  useEffect(() => {
    if (video) {
      setViewCount(video.watchCount); 
    }
  }, [video]);

  const incrementView = async (videoId: string) => {
    try {
      const updatedViewCount = await incrementViews({ id: videoId });

      setViewCount(Number(updatedViewCount));

        console.log(updatedViewCount)
      queryClient.setQueryData(['video', videoId], (oldData: Video) => {
        return oldData ? { ...oldData, watchCount: updatedViewCount } : oldData;
      });


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
