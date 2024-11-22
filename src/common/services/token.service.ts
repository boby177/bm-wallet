import { Request, Response } from "express";

export interface TokenPayload {
  email: string;
  member_code: string;
}

export async function verifyToken(req: Request, res: Response) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      status: 108,
      message: "Unauthorized",
    });
    return;
  }

  return token;
}
