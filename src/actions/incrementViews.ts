"use server";

import { readVideos, writeVideos } from "./videoHandler";

/**
 * Increments the view count of a video.
 * @param id - Video ID.
 * @returns Updated view count.
 */
export async function incrementViews(id: string): Promise<number> {
  const videos = await readVideos();
  const video = videos.find((v: { id: string }) => v.id === id);

  if (!video) {
    throw new Error(`Video with ID ${id} not found`);
  }

  video.watchCount = video.watchCount + 1;

  await writeVideos(videos);

  return video.watchCount;
}