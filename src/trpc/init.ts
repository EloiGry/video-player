
import { initTRPC } from '@trpc/server';
import { cache } from 'react';
import { getSession } from '@/actions/session';



export const createTRPCContext = cache(async () => {
    const session = await getSession();

    return {
        session,
    }
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.

const t = initTRPC.create({

  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;