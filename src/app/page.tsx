import { trpc, HydrateClient } from "@/trpc/server";
import { ClientGreeting } from "@/components/clientGreeting";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { ListLoader } from "@/components/loader/loaderList";
import { Error } from "@/components/error";

export default async function Home() {
  void trpc.video.getVideos.prefetch();
  
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<Error message="Unable to load data. Refresh the page or try later."/>}>
        <Suspense fallback={<ListLoader/>}>
          <div className="container px-4 py-12 fade-in">
                <h1>Check our videos</h1>
                <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, aspernatur aperiam quo molestiae, nulla quia.</p>
                <ClientGreeting/>
              </div>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}


