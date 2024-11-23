import express from "express";
import {
  checkMemberBalance,
  topupBalanceMember,
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
 *                   example: Top up balance successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     balance:
 *                       type: integer
 *                       example: 2000000
 */
TransactionsRoutes.post("/topup", topupBalanceMember);

export default TransactionsRoutes;
