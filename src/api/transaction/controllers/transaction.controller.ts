import "dotenv/config";
import { Request, Response } from "express";
import { verifyToken } from "../../../common/services/token.service";
import { getMemberByEmail } from "../../member/services/member.service";
import {
  memberBalance,
  topupBalance,
  updateMemberBalance,
} from "../services/transaction.service";
import randomstring from "randomstring";

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

export async function topupBalanceMember(req: Request, res: Response) {
  try {
    const { top_up_amount } = req.body;
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

    // Check data inputted top up amount
    if (top_up_amount <= 0) {
      res.status(400).json({
        status: 102,
        message:
          "Parameter top up amount only number and must be not less than 0",
      });
      return;
    }

    // Generate invoice number
    const today = new Date();
    const formattedDate = `${today.getDate()}${today.getMonth() + 1}${today
      .getFullYear()
      .toString()
      .slice(-2)}`;

    const memberCode = randomstring.generate({
      length: 3,
      charset: "numeric",
    });

    const invoiceNumber = `INV${formattedDate}-${memberCode}`;

    // Create new data transaction and update balance member
    await topupBalance(
      profile.id,
      "TOPUP",
      invoiceNumber,
      "Top Up balance",
      top_up_amount
    );

    // Update member balance amount
    const totalAmount = balanceAccount.balance + top_up_amount;
    await updateMemberBalance(profile.id, totalAmount);

    // Get newest member balance amount
    const updatedBalance = await memberBalance(profile.id);

    res.status(200).json({
      status: 0,
      message: "Top up balance successfully",
      data: updatedBalance,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
}
