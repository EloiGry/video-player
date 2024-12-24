"use client";
import { use } from "react";
import { BackButton } from "@/components/backButton";
import { VideoPlayer } from "@/components/videoPlayer";
import { LoaderVideo } from "@/components/loader/loaderVideo";
import { Error } from "@/components/error";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LikeButton } from "@/components/likeButton";
import { useVideoLike } from "@/hooks/useVideoLike";
import { useVideoViews } from "@/hooks/useVideoViews";
import { trpc } from "@/trpc/client";

export default function VideoPlayerPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const router = useRouter();

    const { data: video, error, isLoading } = trpc.video.getVideo.useQuery({ slug });
    const { likeCount, isLiked, handleLike } = useVideoLike(video);
    const { viewCount, incrementView } = useVideoViews(video);

    if (isLoading) return <LoaderVideo />;
    
    if (error)
        return (
            <div className="flex flex-col justify-center items-center gap-2">
                <Error message="Unable to load data. Refresh the page or try later." />
                <Button onClick={() => router.back()}>Back to home</Button>
            </div>
        );

    return (
        <div className="relative pt-12 container fade-in px-4">
            <BackButton className="absolute left-2" />
            <div className="w-full md:w-2/3 mx-auto">
                <h1>{video?.title}</h1>
                <VideoPlayer
                    url={video?.url}
                    title={video?.title}
                    id={video?.id}
                    onView={() => incrementView(video.id)} 
                />
                <div className="flex justify-between items-center mt-2">
                    <LikeButton
                        videoCount={likeCount}
                        handleLike={handleLike}
                        isLiked={isLiked}
                        className="font-semibold"
                    />
                    <span className="font-semibold">{viewCount} views</span>
                </div>
                <p>{video?.description}</p>
            </div>
        </div>
    );
}
