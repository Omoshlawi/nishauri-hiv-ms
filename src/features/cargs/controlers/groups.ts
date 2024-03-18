import { NextFunction, Request, Response } from "express";
import { artGroupRepo } from "../repositories";
import { ARTGroupEnrollmentSchema, ARTGroupSchema } from "../schema";
import { APIException } from "../../../shared/exceprions";
import { z } from "zod";
import { patientRepo } from "../../patients/repositories";

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

export const getMyGroupEnrollments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.query.user_id;
    if (!user) throw { status: 401, errors: { detail: "User required" } };
    const results = await artGroupRepo.findUseGroupEnrollments(user as string);
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
    // TODO Validate cccNumber to see if its online user
    // TODO Ensure curr user has no other group with similar name

    // 1.Creating group with extra subscribers ignoring duplicate subscriber with same ccNumber
    // also create enrollment with curr user as admin
    // TODO Give more comprehensive and relevant user object
    const user = req.query.user_id;
    if (!user) throw { status: 401, errors: { detail: "User required" } };
    const group = await artGroupRepo.create({
      ...validation.data,
      enrollments: { user: { id: user as string } },
    });
    return res.json(group);
  } catch (error) {
    next(error);
  }
};

export const updateGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      !z.string().uuid().safeParse(req.params.id).success ||
      !(await artGroupRepo.exists({ id: req.params.id }))
    ) {
      throw { status: 404, errors: { detail: "ART Group not found" } };
    }
    const validation = await ARTGroupSchema.safeParseAsync(req.body);
    if (!validation.success)
      throw new APIException(400, validation.error.format());
    // TODO validate if user has a group lead roll
    // TODO Validate cccNumber to see if its online user
    // TODO Ensure curr user has no other group with similar name

    // 1.update group with extra subscribers ignoring duplicate subscriber with same ccNumber
    // also deleting extra subscribers not in update list
    const user = req.query.user_id;
    if (!user) throw { status: 401, errors: { detail: "User required" } };
    const group = await artGroupRepo.updateById(req.params.id, validation.data);
    return res.json(group);
  } catch (error) {
    next(error);
  }
};

export const inviteMemberToGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.query.user_id;
    if (!user) throw { status: 401, errors: { detail: "User required" } };
    if (!z.string().uuid().safeParse(req.params.id).success) {
      throw { status: 404, errors: { detail: "ART Group not found" } };
    }
    // Validate the enrollment make sure its admin and current before adding
    const enrollment = await artGroupRepo.findGroupEnrollmentsByCriteria({
      user: {
        path: "$.id",
        equals: user,
      },
      id: req.params.id,
      isAdmin: true,
      isCurrent: true,
    });
    if (!enrollment)
      throw {
        status: 404,
        errors: { detail: "Administrative enrollment not found" },
      };

    const validation = await ARTGroupEnrollmentSchema.safeParseAsync(req.body);
    if (!validation.success)
      throw new APIException(400, validation.error.format());
    const { cccNumber } = validation.data;
    const patient = await patientRepo.findOneByCCCNumber(cccNumber);
    // return res.json(group);
  } catch (error) {
    next(error);
  }
};
