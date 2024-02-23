import { NextFunction, Request, Response } from "express";
import { treatmentSurportRepo } from "../repositories";

export const getTreatmentSuports = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json({ results: await treatmentSurportRepo.findAll() });
  } catch (error) {
    next(error);
  }
};
