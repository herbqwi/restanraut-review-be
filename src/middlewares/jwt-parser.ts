import { Request, Response } from "express";
import { isAuthenticated } from "../services/user.service";

export const jwtParser = async (req: Request, res: Response, next: Function) => {
  const authenticationHeader = req.headers['authorization'];

  if (authenticationHeader?.startsWith('Bearer')) {
    const token = authenticationHeader.split(' ')[1];
    const user = await isAuthenticated({ token });
    res.locals.user = user;
  }

  next();
};

