import { NextFunction, Request, Response } from "express";
import { artEventsRepo, artGroupRepo } from "../repositories";
import { ARTEventchema } from "../schema";
import { APIException } from "../../../shared/exceprions";

export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await artEventsRepo.findAll();
    return res.json({ results });
  } catch (error) {
    next(error);
  }
};

export const createEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validation = await ARTEventchema.safeParseAsync(req.body);
    if (!validation.success)
      throw new APIException(400, validation.error.format());
    const user = (req as any).user;
    const { groupMembership, ...eventData } = validation.data;
    // 1.Ensure membership exist and isAdmin
    const enrollment = await artGroupRepo.findUseGroupEnrollmentById(
      user.id,
      groupMembership
    );
    if (!enrollment || !enrollment.isAdmin) {
      throw new APIException(400, {
        groupMembership: { _errors: ["Invalid group or you aunt group admin"] },
      });
    }
    const results = await artEventsRepo.create({
      ...eventData,
      groupId: enrollment.groupId,
    });
    return res.json(results);
  } catch (error) {
    next(error);
  }
};
