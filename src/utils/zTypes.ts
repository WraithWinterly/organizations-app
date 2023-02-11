import { z } from "zod";

export const organizationInput = z.object({
  name: z.string().min(1).max(25),
  description: z.string().min(1).max(100),
});
