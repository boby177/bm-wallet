import express from "express";
import { bannerList, serviceList } from "./controllers/information.controller";

const InformationsRoutes = express.Router();

/**
 * @swagger
 * /banner:
 *   get:
 *    summary: Get list banner
 *    tags: [Module Information]
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
 *                   example: Successfully get data member balance
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           banner_name:
 *                             type: string
 *                             example: Banner 1
 *                           banner_image:
 *                             type: string
 *                             example: https://nutech-integrasi.app/dummy.jpg
 *                           description:
 *                             type: string
 *                             example: Lerem Ipsum Dolor sit amet
 */
InformationsRoutes.get("/banner", bannerList);

/**
 * @swagger
 * /services:
 *   get:
 *    summary: Get list services
 *    tags: [Module Information]
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
 *                   example: Successfully get data services
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           service_code:
 *                             type: string
 *                             example: PAJAK
 *                           service_name:
 *                             type: string
 *                             example: Pajak PBB
 *                           service_icon:
 *                             type: string
 *                             example: https://nutech-integrasi.app/dummy.jpg
 *                           service_tarif:
 *                             type: number
 *                             example: 40000
 */
InformationsRoutes.get("/services", serviceList);

export default InformationsRoutes;
