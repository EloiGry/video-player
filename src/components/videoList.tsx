import { Video } from "@/types/video";
import { Dot, Play } from "lucide-react";
import Link from "next/link";
import { Card, CardTitle, CardDescription } from "./ui/card";
import { Thumbnail } from "./ui/thumbnail";

type VideoListProps = {
    videos: Video[]
}

export function VideoList({videos}: VideoListProps) {
    return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {videos?.map((video) => (
        <Card className="border-none hover:opacity-85 transition-all duration-150" key={video.id}>
            <Link href={`/${video.slug}`}>
                <div className="relative rounded-t-xl">
                    <Play size={48} className="absolute z-10 inset-0 m-auto hover:text-white duration-150"/>
                    <Thumbnail src={video.thumbnail} alt={video.title}/>
                    {/* <Image src={video.thumbnail} alt={video.title} width={500} height={500} className="rounded-t-xl"/> */}
                    <div className="absolute rounded-t-xl w-full inset-0 bg-black/20"/>
                </div>
                <CardTitle className="m-2">{video.title}</CardTitle>
                <CardDescription className="flex mx-2 mb-2">
                    <span> {video.watchCount} views </span>
                    <Dot/>
                    <span> {video.likeCount} likes </span>
                </CardDescription>
            </Link>
        </Card>
      ))}
    </div>
    )
}