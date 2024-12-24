"use server";

import { getSession } from "./session";
import { Video } from "@/types/video";

export async function IsLiked (video: Video) {
    const session = await getSession()
    if (!session) {
        return false
    }
    return video.likedBy.includes(session.sessionId);
}