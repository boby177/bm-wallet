import express from "express";
import { checkMemberBalance } from "./controllers/transaction.controller";

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

export default TransactionsRoutes;
