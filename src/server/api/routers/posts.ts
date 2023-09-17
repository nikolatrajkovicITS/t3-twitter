import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";
import { z } from "zod";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    imageUrl: user.imageUrl,
  };
};

/**
 * @createTRPCRouter used to create a router for a specific resource
 * @publicProcedure used to create a procedure(function) that is accessible to the public
 */
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
    });

    const users = (
      await clerkClient.users.getUserList({
        userId: posts.map((post) => post.authorId),
        limit: 100,
      })
    ).map(filterUserForClient);

    console.log("usersusers", users);

    return posts.map((post) => {
      const user = users.find((user) => user.id === post.authorId);

      return {
        post,
        author: user,
      };
    });
  }),
});
