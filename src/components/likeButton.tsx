
import { Button } from "./ui/button";
import { ThumbsUp } from "lucide-react";

type LikeButtonProps = {
   handleLike : () => void;
   isLiked: boolean;
   videoCount: number;
   className?: string
  };
  
export function LikeButton({ handleLike, isLiked, videoCount, className }: LikeButtonProps) {

  return (
    <div className="flex gap-2 items-center">
      <Button  onClick={handleLike} variant={isLiked ? "default" : "outline"}><ThumbsUp/></Button>
      <span className={className}>{videoCount} likes</span>
    </div>
  );
}

