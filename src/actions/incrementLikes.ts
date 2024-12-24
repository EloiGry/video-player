"use server";
import { readVideos, writeVideos } from "@/actions/videoHandler";
import { getSession } from "@/actions/session";

/**
 * Toggles like for a video and updates its like count.
 * @param id - Video ID.
 * @returns Updated like count.
 */
export const incrementLikes = async (id: string): Promise<number> => {
  const { sessionId } = await getSession();
  const videos = await readVideos();
  const video = videos.find((v: { id: string }) => v.id === id);

  if (!video) throw new Error(`Video with ID ${id} not found`);

  const hasLiked = video.likedBy.includes(sessionId);

  if (hasLiked) {
    video.likedBy = video.likedBy.filter((id: string) => id !== sessionId);
    video.likeCount -= 1;
  } else {
    video.likedBy.push(sessionId);
    video.likeCount += 1;
  }

  await writeVideos(videos);
  return video.likeCount;
};