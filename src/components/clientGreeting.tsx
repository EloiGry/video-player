'use client';

import { trpc } from '@/trpc/client';
import { VideoList } from '@/components/videoList';


export function ClientGreeting() {
  const [data] = trpc.video.getVideos.useSuspenseQuery();
  return (
      <VideoList videos={data} />
  );
}
