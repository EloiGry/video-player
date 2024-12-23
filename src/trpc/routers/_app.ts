import { createTRPCRouter } from '../init';
import { videoRouter } from './video';

export const appRouter = createTRPCRouter({
    video: videoRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;