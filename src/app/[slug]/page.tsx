"use client"
import { trpc } from "@/trpc/client"
import { use } from "react";
import { BackButton } from "@/components/backButton";
import { VideoPlayer } from "@/components/videoPlayer";

export default function VideoPlayerPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { data: video, error, isLoading } = trpc.video.getVideo.useQuery({ slug});
    if (isLoading) return <p> Loading</p>
    if (error) return <p> Error</p>
    console.log(video)
    return (
        <div className="relative pt-12 container">
            <BackButton className="absolute left-2"/>
        <div className="w-full md:w-2/3 mx-auto">
            <h1> {video.title} </h1>
            <VideoPlayer url={video.url} title={video.title}/>
            <p> {video.description} </p>
        </div>
        </div>
    )
}