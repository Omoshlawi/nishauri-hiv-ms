import { NextFunction, Request, Response } from "express";
import { courierRepo } from "../repositories";

export const getCourierServices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await courierRepo.findAll();
    return res.json({ results });
  } catch (error) {
    next(error);
  }
};
