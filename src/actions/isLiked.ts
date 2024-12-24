"use server";

import { getSession } from "./session";
import { Video } from "@/types/video";

/**
 * Checks if the current user has liked a video.
 * @param video - Video to check.
 * @returns True if liked, false otherwise.
 */
export async function IsLiked(video: Video): Promise<boolean> {
  const session = await getSession();
  if (!session) return false;
  return video.likedBy.includes(session.sessionId);
}