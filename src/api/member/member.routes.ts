import express from "express";

export const MembersRoutes = express.Router();

/**
 * @swagger
 * /profile:
 *   get:
 *    summary: Get profile member
 *    tags: [Module Membership]
 */
MembersRoutes.get("/profile");

export default MembersRoutes;
