import { NextFunction, Request, Response } from "express";
import { appointmentRepo } from "../repositories";

export const getAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.query.user_id;
    if (!user) throw { status: 403, errors: { detail: "User required" } };

    const results = await appointmentRepo.findAll(user as string);
    return res.json({ results });
  } catch (error) {
    next(error);
  }
};

export const getAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.query.user_id;
    if (!user) throw { status: 403, errors: { detail: "User required" } };

    const results = await appointmentRepo.findOneById(
      req.params.id,
      user as string
    );
    return res.json(results);
  } catch (error) {
    next(error);
  }
};
