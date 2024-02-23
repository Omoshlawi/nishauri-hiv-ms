import { z } from "zod";

// TODO REPLACE CARE RECIVER AND COURIER WITH UUID
export const OrderSchema = z
  .object({
    mode: z.enum(["event", "appointment"]),
    type: z.enum(["self", "other"]),
    event: z.string().uuid().optional(),
    appointment: z.string().optional(),
    careReceiver: z.string().optional(),
    deliveryMethod: z.enum(["in_parcel", "in_person"]),
    courierService: z.string().optional(),
    deliveryPerson: z
      .object({
        fullName: z.string(),
        nationalId: z.coerce.number(),
        phoneNumber: z.string(),
        pickupTime: z.coerce.date(),
      })
      .optional(),
    phoneNumber: z.string(),
    deliveryLocation: z.object({
      latitude: z.coerce.number(),
      longitude: z.coerce.number(),
      address: z.string(),
    }),
  })
  // 1. if mode === event then make event required else make appointment required
  // 2. if type === other then make event careReceiver required
  // 3. if deiveryMethod === "in_percel" then make courier service required else make delivery person required
  //    ------------------------1-----------------------
  .refine((data) => (data.mode === "event" && !data.event) === false, {
    message: "Required",
    path: ["event"],
  })
  .refine(
    (data) => (data.mode === "appointment" && !data.appointment) === false,
    {
      message: "Required",
      path: ["appointment"],
    }
  )
  //   ------------------------2 -------------------------
  .refine((data) => (data.type === "other" && !data.careReceiver) === false, {
    message: "Required",
    path: ["careReceiver"],
  })
  //   ------------------------3----------------------
  .refine(
    (data) =>
      (data.deliveryMethod === "in_parcel" && !data.courierService) === false,
    {
      message: "Required",
      path: ["courierService"],
    }
  )
  .refine(
    (data) =>
      (data.deliveryMethod === "in_person" && !data.deliveryPerson) === false,
    {
      message: "Required",
      path: ["deliveryPerson"],
    }
  );
