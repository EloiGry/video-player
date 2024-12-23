"use server";

import { readVideos, writeVideos } from "./videoHandler";

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