import { useState, useEffect } from "react";
import { trpc } from "@/trpc/client";
import { IsLiked } from "@/actions/isLiked";
import { Video } from "@/types/video";
import { useQueryClient } from "@tanstack/react-query";
import { getSession } from "@/actions/session";

export function useVideoLike(video: Video) {
  const [likeState, setLikeState] = useState({
    likeCount: video?.likeCount || 0,
    isLiked: false,
    likedBy: video?.likedBy || [],
  });

  const queryClient = useQueryClient();
  const { mutateAsync: incrementLikes } = trpc.video.incrementLikes.useMutation();

  // Check if the user has already liked the video when it changes
  useEffect(() => {
    if (video) {
      IsLiked(video).then((liked) => {
        setLikeState((prevState) => ({
          ...prevState,
          isLiked: liked,
          likeCount: video.likeCount,
          likedBy: video.likedBy,
        }));
      });
    }
  }, [video]);

  const handleLike = async () => {
    try {
      const session = await getSession();
      if (!session) return false;


      const newLikeCount = await incrementLikes({ id: video.id });
      const newLikedBy = likeState.isLiked
        ? likeState.likedBy.filter((id) => id !== session.sessionId) 
        : [...likeState.likedBy, session.sessionId]; 

      setLikeState({
        likeCount: newLikeCount,
        isLiked: !likeState.isLiked,
        likedBy: newLikedBy,
      });

      // Update video cache data
      queryClient.setQueryData(['video', video.id], (oldData: Video) => {
        return oldData ? { ...oldData, likeCount: newLikeCount, likedBy: newLikedBy } : oldData;
      });

      // Update videos cache data
      queryClient.setQueryData(['videos'], (oldData: Video[]) => {
        return oldData?.map((v: Video) =>
          v.id === video.id ? { ...v, likeCount: newLikeCount, likedBy: newLikedBy } : v
        );
      });

      // Invalidate queries to refresh data in other components
      queryClient.invalidateQueries(['videos'] as any);

    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return {
    likeCount: likeState.likeCount,
    isLiked: likeState.isLiked,
    handleLike,
  };
}