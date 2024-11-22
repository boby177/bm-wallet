import express from "express";
import { memberProfile } from "./controllers/member.controller";

export const MembersRoutes = express.Router();

/**
 * @swagger
 * /profile:
 *   get:
 *    summary: Get profile member
 *    tags: [Module Membership]
 *    responses:
 *       401:
 *         description: Unauthorized
 *       200:
 *         description: Successfully get data member profile
 *       500:
 *         description: Internal server errors
 */
MembersRoutes.get("/profile", memberProfile);

export default MembersRoutes;
