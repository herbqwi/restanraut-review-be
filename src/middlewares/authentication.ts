import { Request, Response } from "express";

export const authorized = async (req: Request, res: Response, next: Function) => {
  const user = res.locals.user;
  if (!user) {
    return res.status(401).send('Unauthorized');
  }
  next();
};

