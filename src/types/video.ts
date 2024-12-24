export type Video = {
    id: string;
    slug: string;
    thumbnail: string;
    title: string;
    description: string;
    likeCount: number;
    watchCount: number;
    likedBy: string[];
}