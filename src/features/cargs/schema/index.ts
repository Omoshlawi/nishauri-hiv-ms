import { z } from "zod";

export const ARTGroupSchema = z.object({
  title: z.string().min(4),
  description: z.string().optional().nullable(),
});
