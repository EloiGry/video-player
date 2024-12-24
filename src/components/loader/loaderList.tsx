import { Skeleton } from "../ui/skeleton"

export function ListLoader() {
    return (
        <div className="flex flex-col gap-4 container px-4 pt-12">
            <Skeleton className="h-10 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Skeleton className="w-full h-[200px]" />
                <Skeleton className="w-full h-[200px]" />
                <Skeleton className="w-full h-[200px]" />
                <Skeleton className="w-full h-[200px]" />
                <Skeleton className="w-full h-[200px]" />
                <Skeleton className="w-full h-[200px]" />
            </div>
        </div>
    )
}