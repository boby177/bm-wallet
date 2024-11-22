import express from "express";

export const TransactionsRoutes = express.Router();

/**
 * @swagger
 * /balance:
 *   get:
 *    summary: Get data user balance
 *    tags: [Module Transaction]
 */
TransactionsRoutes.get("/balance");

export default TransactionsRoutes;
