import { z } from "zod";

/**
 * @createTRPCRouter used to create a router for a specific resource
 * @publicProcedure used to create a procedure(function) that is accessible to the public
 */
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),
});
