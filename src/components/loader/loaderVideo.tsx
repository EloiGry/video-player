import { Skeleton } from "../ui/skeleton"

export function LoaderVideo() {
    return (
        <div className="pt-12 container">
            <div className="w-full md:w-2/3 mx-auto space-y-4">
                <Skeleton className="h-10 w-[200px]" />
                <Skeleton className="h-[400px] w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
            </div>
        </div>
    )
}