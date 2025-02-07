import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const protectRoute = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;


    req.user = { id: decoded.id };
    if (!req.user.id) {
      res.status(401).json({ message: "Invalid user in token" });
      return;
    }
    console.log(req.user.id);
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
    return;
  }
};

export default protectRoute;
