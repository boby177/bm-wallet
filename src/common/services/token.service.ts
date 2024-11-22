import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface TokenPayload {
  email: string;
  member_code: string;
}

export async function verifyToken(req: Request, res: Response) {
  const authHeader = req.headers.authorization;
  const token: any = authHeader && authHeader.split(" ")[1];

  // Check data token and decode data token
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  return decoded;
}
