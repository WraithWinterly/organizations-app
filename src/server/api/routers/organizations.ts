import { organizationInput } from "@/utils/zTypes";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const organizationRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.organization.findMany();
  }),

  createOrganization: protectedProcedure
    .input(organizationInput)
    .mutation(async ({ ctx, input }) => {
      const org = await ctx.prisma.organization.create({
        data: {
          name: input.name,
          description: input.description,
        },
      });

      return org;
    }),
});
