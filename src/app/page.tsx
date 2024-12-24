"use client"
import { ListLoader } from "@/components/loader/loaderList";
import { Error } from "@/components/error";
import { VideoList } from "@/components/videoList";
import { trpc } from "@/trpc/client";


export default function Home() {
  const { data: videos, error, isLoading, refetch } = trpc.video.getVideos.useQuery(undefined, {
    enabled: true,
  })



  if (isLoading) return <ListLoader />;


  if (error)
    return (
      <div className="flex flex-col justify-center items-center gap-2">
        <Error message="Unable to load data. Refresh the page or try later." />
      </div>
    );


  return (
    <div className="container px-4 pt-12 fade-in">
      <h1> Check our videos </h1>
      <p className="mb-2"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, aspernatur aperiam quo molestiae, nulla quia.</p>
      <VideoList videos={videos || []} />
    </div>
  );
}
