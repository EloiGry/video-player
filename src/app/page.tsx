import { trpc } from "@/trpc/server";
import { Dot, Play } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";


export default async function Home() {
  const videos = await trpc.video.getVideos()
  return (
    
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 container px-4 pt-12 fade-in">
      {videos?.map((video) => (
        <Link href={`/${video.slug}`} key={video.id}>
        <Card className="border-none">
          <div className="relative rounded-t-xl">
          <Play size={48} className="absolute z-10 inset-0 m-auto hover:text-white duration-150"/>
          <Image src={video.thumbnail} alt={video.title} width={500} height={500} className="rounded-t-xl"/>
          <div className="absolute w-full inset-0 bg-black/40"/>
          </div>
          <CardTitle className="m-2">{video.title}</CardTitle>
          <CardDescription className="flex mx-2 mb-2">
            <span> 300 views </span>
            <Dot/>
            <span> 16 likes </span>
          </CardDescription>
        </Card>
        </Link>
      ))}
    </div>
  );
}
