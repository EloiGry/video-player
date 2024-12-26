import { Skeleton } from "../ui/skeleton"

export function ListLoader() {
    return (
        <div className="flex flex-col gap-8 container px-4 py-12">
            <Skeleton className="h-10 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((video) => (
                    <Skeleton key={video} className="w-full h-[280px]" />
                ))}
            </div>
        </div>
    )
}