import "dotenv/config";
import { Request, Response } from "express";
import { verifyToken } from "../../../common/services/token.service";
import { getMemberByEmail } from "../../member/services/member.service";
import {
  getMemberTransactions,
  memberBalance,
  topupBalance,
  transactionService,
  updateMemberBalance,
} from "../services/transaction.service";
import { invoiceNumberGenerator } from "../../../common/generator/invoice-number.generator";
import { getServiceByCode } from "../../information/services/information.service";

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
    const invoiceNumber = await invoiceNumberGenerator();

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
      message: "Top up balance Successful",
      data: updatedBalance,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
}

export async function transactionServiceMember(req: Request, res: Response) {
  try {
    const { service_code } = req.body;

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

    // Get data transaction service on master data service
    const service = await getServiceByCode(service_code);

    if (!service) {
      res.status(404).json({
        status: 102,
        message: `Service code ${service_code} is not found`,
      });
      return;
    }

    // Check member current balance before transaction
    if (balanceAccount.balance < service.service_tarif) {
      res.status(422).json({
        status: 102,
        message:
          "Insufficient balance, please top up before making a transaction",
      });
      return;
    }

    // Generate invoice number
    const invoiceNumber = await invoiceNumberGenerator();

    // Create new data transaction and update balance member
    await transactionService(
      profile.id,
      "PAYMENT",
      service.service_code,
      service.service_name,
      invoiceNumber,
      service.service_name,
      service.service_tarif
    );

    // Update member balance amount
    const totalAmount = balanceAccount.balance - service.service_tarif;
    await updateMemberBalance(profile.id, totalAmount);

    // Get newest data transaction member
    const memberTransactions = await getMemberTransactions(profile.id);
    const newestTransaction: any = memberTransactions.pop();

    res.status(200).json({
      status: 0,
      message: `Transaction ${service.service_name} Successful`,
      data: {
        invoice_number: newestTransaction.invoice_number,
        service_code: newestTransaction.service_code,
        service_name: newestTransaction.service_name,
        transaction_type: newestTransaction.transaction_type,
        total_amount: newestTransaction.total_amount,
        created_on: newestTransaction.created_at,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
}
