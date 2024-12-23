"use client";
import { trpc } from "@/trpc/client";
import { VideoPlayer } from "@/components/videoPlayer";

export default function Home() {
  const { data: videos, error, isLoading } = trpc.video.getVideos.useQuery();
  if (isLoading) return <p> Loading</p>
  if (error) return <p> Error</p>
  console.log(videos)
  return (

    <div className="grid grid-cols-2 gap-4 container">
      {videos?.map((video) => (
        <VideoPlayer key={video.id} url={video.url}/>
      ))}
    </div>
  );
}
