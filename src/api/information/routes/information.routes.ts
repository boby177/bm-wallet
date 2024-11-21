import express from "express";

export const InformationsRoutes = express.Router();

/**
 * @swagger
 * /banner:
 *   get:
 *    summary: Get list banner
 *    tags: [Module Information]
 */
InformationsRoutes.get("/banner");

/**
 * @swagger
 * /services:
 *   get:
 *    summary: Get profile member
 *    tags: [Module Information]
 */
InformationsRoutes.get("/services");

export default InformationsRoutes;
