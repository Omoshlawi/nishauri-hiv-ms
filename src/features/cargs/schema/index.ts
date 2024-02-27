import { z } from "zod";

export const ARTGroupSchema = z.object({
  title: z.string().min(4),
  description: z.string().optional().nullable(),
  extraSubscribers: z
    .array(
      z.object({
        name: z.string(),
        cccNumber: z.string(),
        phoneNumber: z.string(),
      })
    )
    .default([]),
});
