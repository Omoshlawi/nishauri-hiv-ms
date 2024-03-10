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

export const ARTEventchema = z.object({
  title: z.string(),
  distributionTime: z.coerce.date(),
  distributionVenue: z.string(),
  remiderNortificationDates: z.array(z.coerce.date()),
  groupMembership: z.string().uuid(),
  remarks: z.string().optional().nullable(),
});
