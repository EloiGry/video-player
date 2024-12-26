import Image from "next/image"

type ThumbnailProps = {
    src: string;
    alt: string;
};

export function Thumbnail ({src, alt}: ThumbnailProps) {
    return (
        <div className="w-full overflow-hidden rounded-t-xl">
            <Image
                src={src}
                alt={alt}
                width={300}
                height={300}
                className="scale-[1.35] object-cover object-center"
            />
        </div>
    )
}