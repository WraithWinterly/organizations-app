import { organizationInput } from "@/utils/zTypes";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const organizationRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.organization.findMany();
  }),
  getByName: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    try {
      const org = await ctx.prisma.organization.findUnique({
        where: {
          name: input,
        },
        include: {
          owner: {
            select: {
              name: true,
              image: true,
            },
          },
          usersData: true,
        },
      });
      if (org == null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Organization with name ${input} not found`,
        });
      }
      return org;
    } catch (e) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Organization with name ${input} not found`,
      });
    }
  }),
  createOrganization: protectedProcedure
    .input(organizationInput)
    .mutation(async ({ ctx, input }) => {
      try {
        const org = await ctx.prisma.organization.create({
          data: {
            name: input.name,
            description: input.description,
            owner: {
              connect: {
                id: ctx.session.user.id,
              },
            },
          },
        });
        return org;
      } catch (err) {
        let error = err as Error;
        return {
          error: {
            message: error.message,
          },
        };
      }
    }),
});
