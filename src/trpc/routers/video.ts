import { z } from 'zod';
import { createTRPCRouter, baseProcedure } from '../init'; 
import { readVideos, readVideoById } from '@/actions/videoHandler';
import { incrementViews } from '@/actions/incrementViews';
import { incrementLikes } from '@/actions/incrementLikes';
import { Video } from '@/types/video';


// Video router
export const videoRouter = createTRPCRouter({
  // Endpoint to get all videos
  getVideos: baseProcedure.query(async () => {
    const videos = await readVideos(); 
    return videos; 
  }),
  
  // Endpoint to get one video
  getVideo: baseProcedure
    .input(z.object({
    id: z.string().min(1),
    }))
    .query(async (opts) => {
    const { id } = opts.input;
    const videos = await readVideoById(id); 
    return videos.find((video: Video) => video.id === id) || null;
    }),


  // Increment views
  incrementViews: baseProcedure
    .input(z.object({
      id: z.string().min(1),
    }))
    .mutation(async (opts) => {
      const { id } = opts.input;

      return await incrementViews(id);
    }),

  // Increment likes
  incrementLikes: baseProcedure
    .input(z.object({
      id: z.string().min(1),
    }))
    .mutation(async (opts) => {
        const { id } = opts.input;
    
        return await incrementLikes(id);
      }),
});
