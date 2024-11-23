import { Request, Response } from "express";
import "dotenv/config";
import { verifyToken } from "../../../common/services/token.service";
import { getMemberByEmail } from "../../member/services/member.service";
import { memberBalance } from "../services/transaction.service";

export async function checkMemberBalance(req: Request, res: Response) {
  try {
    // Check data token
    if (req.headers.authorization === undefined) {
      res.status(401).json({
        status: 108,
        message: "Unauthorized",
      });
      return;
    }

    // Verify data token and get data email member
    const token: any = await verifyToken(req, res);
    const profile = await getMemberByEmail(token.email);

    const balanceAccount = await memberBalance(profile.id);

    res.status(200).json({
      status: 0,
      message: "Successfully get data member balance",
      data: balanceAccount,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
}
