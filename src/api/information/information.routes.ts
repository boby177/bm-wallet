import express from "express";
import { bannerList, serviceList } from "./controllers/information.controller";

const InformationsRoutes = express.Router();

/**
 * @swagger
 * /banner:
 *   get:
 *    summary: Get list banner
 *    tags: [Module Information]
 *    responses:
 *       401:
 *         description: Unauthorized
 *       200:
 *         description: Successfully get data banners
 *       500:
 *         description: Internal server errors
 */
InformationsRoutes.get("/banner", bannerList);

/**
 * @swagger
 * /services:
 *   get:
 *    summary: Get list services
 *    tags: [Module Information]
 *    responses:
 *       401:
 *         description: Unauthorized
 *       200:
 *         description: Successfully get data services
 *       500:
 *         description: Internal server errors
 */
InformationsRoutes.get("/services", serviceList);

export default InformationsRoutes;
