import express from "express";
import {
  memberLogin,
  memberProfile,
  memberRegister,
  updateMember,
} from "./controllers/member.controller";
import { verifyToken } from "../../common/services/token.service";

export const MembersRoutes = express.Router();

/**
 * @swagger
 * /registration:
 *   post:
 *     summary: Member Register
 *     tags: [Module Membership]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             email: boby.sm378@gmail.com
 *             first_name: Boby
 *             last_name: Maulana
 *             password: "abcd1234"
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
 *                   example: Password length must be at least 8 characters
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
 *                   example: Email already exist, please use different email
 *                 data:
 *                   type: null
 *                   example: null
 *       201:
 *         description: Request Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Successfully created new data member
 *                 data:
 *                   type: null
 *                   example: null
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
MembersRoutes.post("/registration", memberRegister);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Member Login
 *     tags: [Module Membership]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             email: boby.sm378@gmail.com
 *             password: "abcd1234"
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
 *                   example: Password length must be at least 8 characters
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
 *                   example: Email already exist, please use different email
 *                 data:
 *                   type: null
 *                   example: null
 *       201:
 *         description: Request Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Successfully created new data member
 *                 data:
 *                   type: null
 *                   example: null
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
MembersRoutes.post("/login", memberLogin);

/**
 * @swagger
 * /profile:
 *   get:
 *    summary: Get profile member
 *    tags: [Module Membership]
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
 *                   example: Successfully get data member profile
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: boby.sm378@gmail.com
 *                     first_name:
 *                       type: string
 *                       example: Boby
 *                     last_name:
 *                       type: string
 *                       example: Maulana
 *                     profile_image:
 *                       type: string
 *                       example: https://yoururlapi.com/profile.jpeg
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
MembersRoutes.get("/profile", memberProfile);

/**
 * @swagger
 * /profile/update:
 *   put:
 *     summary: Member Register
 *     tags: [Module Membership]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *           example:
 *             first_name: Boby
 *             last_name: Maulana
 *     responses:
 *       200:
 *         description: Request Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Successfully updated data profile
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: boby.sm378@gmail.com
 *                     first_name:
 *                       type: string
 *                       example: Boby
 *                     last_name:
 *                       type: string
 *                       example: Maulana
 *                     profile_image:
 *                       type: string
 *                       example: https://yoururlapi.com/profile.jpeg
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
 */
MembersRoutes.put("/profile/update", updateMember);

export default MembersRoutes;
