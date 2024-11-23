import express from "express";
import {
  checkMemberBalance,
  topupBalanceMember,
  transactionServiceMember,
} from "./controllers/transaction.controller";

export const TransactionsRoutes = express.Router();

/**
 * @swagger
 * /balance:
 *   get:
 *    summary: Get member balance
 *    tags: [Module Transaction]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 108
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       200:
 *         description: Successfully get data member profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: Successfully get data member balance
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: integer
 *                       example: 1000000
 */
TransactionsRoutes.get("/balance", checkMemberBalance);

/**
 * @swagger
 * /topup:
 *   post:
 *     summary: Member Top Up Balance
 *     tags: [Module Transaction]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               top_up_amount:
 *                 type: number
 *           example:
 *             top_up_amount: 1000000
 *     responses:
*       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 108
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 102
 *                 message:
 *                   type: string
 *                   example: Parameter top up amount only number and must be not less than 0
 *                 data:
 *                   type: null
 *                   example: null
 *       200:
 *         description: Request Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: Top up balance Successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     balance:
 *                       type: integer
 *                       example: 2000000
 */
TransactionsRoutes.post("/topup", topupBalanceMember);

/**
 * @swagger
 * /transaction:
 *   post:
 *     summary: Member Transaction Service
 *     tags: [Module Transaction]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service_code:
 *                 type: number
 *           example:
 *             service_code: PULSA
 *     responses:
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 108
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 102
 *                 message:
 *                   type: string
 *                   example: Service is not found
 *                 data:
 *                   type: null
 *                   example: null
 *       422:
 *         description: Unprocessable Entity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 102
 *                 message:
 *                   type: string
 *                   example: Insufficient balance, please top up before making a transaction
 *                 data:
 *                   type: null
 *                   example: null
 *       200:
 *         description: Request Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: Transaction PLN Prabayar Successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     invoice_number:
 *                       type: string
 *                       example: INV17082023-001
 *                     service_code:
 *                       type: string
 *                       example: PLN_PRABAYAR
 *                     service_name:
 *                       type: string
 *                       example: PLN Prabayar
 *                     transaction_type:
 *                       type: string
 *                       example: PAYMENT
 *                     total_amount:
 *                       type: number
 *                       example: 10000
 *                     created_on:
 *                       type: string
 *                       example: 2023-08-17T10:10:10.000Z
 */
TransactionsRoutes.post("/transaction", transactionServiceMember);

export default TransactionsRoutes;
