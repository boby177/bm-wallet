import express from "express";
import { BannerList, ServiceList } from "../controllers/information.controller";

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
InformationsRoutes.get("/banner", BannerList);

/**
 * @swagger
 * /services:
 *   get:
 *    summary: Get profile member
 *    tags: [Module Information]
 */
InformationsRoutes.get("/services");

export default InformationsRoutes;
