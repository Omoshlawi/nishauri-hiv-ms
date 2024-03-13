import { NextFunction, Request, Response } from "express";
import { courierRepo, ordersRepo } from "../repositories";
import { OrderSchema } from "../schema";
import { APIException } from "../../../shared/exceprions";
import { appointmentRepo } from "../../appointments/repositories";
import { Appointment } from "../../appointments/entities";
import { Courier } from "../entities";
import { artEventsRepo } from "../../cargs/repositories";
import { treatmentSurportRepo } from "../../treatment_support/repositories";

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await ordersRepo.findAll();
    return res.json({ results });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);

    const validation = await OrderSchema.safeParseAsync(req.body);
    if (!validation.success) {
      console.log(validation.error.format());

      throw new APIException(400, validation.error.format());
    }
    console.log(validation.data);
    const {
      deliveryAddress,
      deliveryMethod,
      phoneNumber,
      type,
      mode,
      appointment,
      careReceiver: cccNumber,
      courierService,
      deliveryPerson,
      event,
    } = validation.data;
    let _appointment: Appointment | undefined;
    let _courier: Courier | undefined;
    let _patient;

    // TODO Ensure appointment exists and get its detail info
    if (mode === "appointment") {
      _appointment = await appointmentRepo.findOneById(appointment!);
      // TODO Ensure appointment if refill and is upcoming in not more than next 1 week
      if (!_appointment || _appointment.appointmentType !== "Re-Fill") {
        throw {
          status: 400,
          errors: { appointment: { _errors: ["Invalid appointment"] } },
        };
      }
    }
    if (mode === "event" && !(await artEventsRepo.exists({ id: event! }))) {
      throw {
        status: 400,
        errors: { event: { _errors: ["Invalid event"] } },
      };
    }
    if (deliveryMethod === "in_parcel") {
      _courier = await courierRepo.findOneById(courierService!);
      if (_courier) {
        throw {
          status: 400,
          errors: { courierService: { _errors: ["Invalid courier service"] } },
        };
      }
    }
    // TODO Assert careReceiver exists and query its basic information
    if (type === "other") {
      // 1. Get care receiver by cccNumber
      // 2. Assertain careReceiver is given care by curr User i.e curr User is care giver to the careReceiver
      const _careReceiver = await treatmentSurportRepo.findOneById(cccNumber!);
      
    } else {
      // ensure curr user is patient User current user
    }

    if (!_patient) {
      throw {
        status: 400,
        errors: { careReceiver: { _errors: ["Invalid careReceiver"] } },
      };
    }

    const order = await ordersRepo.create({
      deliveryAddress,
      deliveryMethod,
      phoneNumber,
      type,
      appointment: _appointment as any,
      eventId: mode === "event" ? event : undefined,
      courierService: _courier as any,
      deliveryPerson:
        deliveryMethod === "in_person"
          ? {
              ...deliveryPerson,
              pickupTime: deliveryPerson!.pickupTime.toISOString(),
            }
          : undefined,
      patient: _patient,
    });
    // const results = await ordersRepo.findAll();
    return res.json(order);
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await ordersRepo.findAll();
    return res.json({ results });
  } catch (error) {
    next(error);
  }
};
