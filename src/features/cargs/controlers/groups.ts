import { NextFunction, Request, Response } from "express";
import { artGroupRepo } from "../repositories";
import { ARTGroupSchema } from "../schema";
import { APIException } from "../../../shared/exceprions";

export const getGroups = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await artGroupRepo.findAll();
    return res.json({ results });
  } catch (error) {
    next(error);
  }
};

export const createGroups = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validation = await ARTGroupSchema.safeParseAsync(req.body);
    if (!validation.success)
      throw new APIException(400, validation.error.format());
    // TODO validate if user has a group lead roll
    // 1.Creating group
    const group = await artGroupRepo.create(validation.data);
    // 2.Create enrollment with current user as the admin
    const results = await artGroupRepo.findAll();
    return res.json({ results });
  } catch (error) {
    next(error);
  }
};
