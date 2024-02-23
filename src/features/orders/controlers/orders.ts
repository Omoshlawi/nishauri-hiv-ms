import { NextFunction, Request, Response } from "express";
import { ordersRepo } from "../repositories";

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
    const results = await ordersRepo.findAll();
    return res.json({ results });
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
