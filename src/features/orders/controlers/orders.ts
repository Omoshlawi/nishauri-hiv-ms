import { NextFunction, Request, Response } from "express";
import { courierRepo, ordersRepo } from "../repositories";
import { OrderSchema } from "../schema";
import { APIException } from "../../../shared/exceprions";
import { appointmentRepo } from "../../appointments/repositories";
import { Appointment } from "../../appointments/entities";
import { Courier } from "../entities";
import { artEventsRepo } from "../../cargs/repositories";
import { treatmentSurportRepo } from "../../treatment_support/repositories";
import { patientRepo } from "../../patients/repositories";

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.query.user_id;
    if (!user) throw { status: 401, errors: { detail: "User required" } };
    const results = await ordersRepo.findByCriteria({
      OR: [
        { orderedBy: { path: "$.id", equals: user } },
        { patient: { path: "$.id", equals: user } },
      ],
    });
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
      throw new APIException(400, validation.error.format());
    }
    const user = req.query.user_id;
    if (!user) throw { status: 401, errors: { detail: "User required" } };
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
      if (!_appointment || _appointment.appointment_type !== "Re-Fill") {
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
      // TODO Handler none nishauri user
      const _careReceiver = await treatmentSurportRepo.findOneById(cccNumber!);
    } else {
      // ensure curr user is patient User current user
      _patient = await patientRepo.findOneById(user as string);
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
      patient: _patient as any,
      orderedBy: { id: user },
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
