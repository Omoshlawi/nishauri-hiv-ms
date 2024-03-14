import { NextFunction, Request, Response } from "express";
import { artEventsRepo, artGroupRepo } from "../repositories";
import { ARTEventchema } from "../schema";
import { APIException } from "../../../shared/exceprions";
import { z } from "zod";

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
export const getMyEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.query.user_id;
    if (!user) throw { status: 403, errors: { detail: "User required" } };

    const results = await artEventsRepo.findByCriteria({
      group: {
        enrollments: { some: { user: { path: "$.id", equals: user } } },
      },
    });
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
    const user = req.query.user_id;
    if (!user) throw { status: 401, errors: { detail: "User required" } };
    const { groupMembership, ...eventData } = validation.data;
    // 1.Ensure membership exist and isAdmin
    const enrollment = await artGroupRepo.findUseGroupEnrollmentById(
      user as string,
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

export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      !z.string().uuid().safeParse(req.params.id).success ||
      !(await artEventsRepo.exists({ id: req.params.id }))
    ) {
      throw { status: 404, errors: { detail: "ART event not found" } };
    }
    const validation = await ARTEventchema.safeParseAsync(req.body);
    if (!validation.success)
      throw new APIException(400, validation.error.format());
    const user = req.query.user_id;
    if (!user) throw { status: 401, errors: { detail: "User required" } };

    const { groupMembership, ...eventData } = validation.data;
    // 1.Ensure membership exist and isAdmin
    const enrollment = await artGroupRepo.findUseGroupEnrollmentById(
      user as string,
      groupMembership
    );
    if (!enrollment || !enrollment.isAdmin) {
      throw new APIException(400, {
        groupMembership: { _errors: ["Invalid group or you aunt group admin"] },
      });
    }
    const results = await artEventsRepo.updateById(req.params.id, {
      ...eventData,
      groupId: enrollment.groupId,
    });
    return res.json(results);
  } catch (error) {
    next(error);
  }
};
