import { deleteImage } from "@/utils/cloudinary";
import { organizationInput } from "@/utils/organization.schema";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const config = {
  api: {
    bodyParser: false,
  },
};

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
          backgroundImage: true,
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
  deleteOrganization: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const org = await ctx.prisma.organization.findUnique({
        where: {
          name: input,
        },
        include: {
          backgroundImage: true,
        },
      });
      if (!!org?.backgroundImage && !!org.backgroundImage.publicId) {
        await deleteImage(org.backgroundImage.publicId);
      }
      if (org?.ownerId === ctx.session.user.id) {
        await ctx.prisma.organization.delete({
          where: {
            name: input,
          },
        });
        return true;
      } else {
        return new TRPCError({
          code: "BAD_REQUEST",
          message: `You are not the owner of this organization`,
        });
      }
    }),
});
