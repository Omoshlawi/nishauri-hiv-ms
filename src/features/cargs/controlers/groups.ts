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
    console.log((req as any).user);
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
    console.log((req as any).user);
    const results = await artGroupRepo.findUseGroupEnrollments(
      (req as any).user.id
    );
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
    // TODO Ensure no two extra subscriber has similar cccNumber
    // TODO Validate cccNumber to see if its online user
    // TODO Ensure curr user has no other group with similar name

    // 1.Creating group
    const group = await artGroupRepo.create(validation.data);
    // TODO Give more comprehensive and relevant user object
    const user = (req as any).user;
    // 2.Create enrollment with current user as the admin
    await artGroupRepo.createUserGroupEnrollments({
      user: { id: user.id },
      groupId: group.id,
      isAdmin: true,
      isCurrent: true,
    });
    const results = await artGroupRepo.findOneById(group.id);
    return res.json({ results });
  } catch (error) {
    next(error);
  }
};
