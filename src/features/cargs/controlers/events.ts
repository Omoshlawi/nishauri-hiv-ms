import { NextFunction, Request, Response } from "express";
import { artEventsRepo } from "../repositories";

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
    const results = await artEventsRepo.findAll();
    
  } catch (error) {
    next(error);
  }
};
