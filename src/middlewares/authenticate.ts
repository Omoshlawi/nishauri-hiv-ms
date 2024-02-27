import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-access-token");
  if (!token)
    return res.status(401).json({ detail: "Unauthorized - Token missing" });
  try {
    const decoded: any = jwt.decode(token);
    (req as any).user = { _id: decoded._id };
    return next();
  } catch (error) {
    res.status(401).json({ detail: "Unauthorized - Invalid token" });
  }
};
export default authenticate;
