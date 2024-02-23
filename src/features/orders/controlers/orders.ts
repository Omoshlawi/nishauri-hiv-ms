import { NextFunction, Request, Response } from "express";
import { ordersRepo } from "../repositories";
import { OrderSchema } from "../schema";
import { APIException } from "../../../shared/exceprions";

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
    const validation = await OrderSchema.safeParseAsync(req.body);
    if (!validation.success)
      throw new APIException(400, validation.error.format());

    // const results = await ordersRepo.findAll();
    return res.json(validation.data);
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
