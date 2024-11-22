import { Request, Response } from "express";
import { getMemberByEmail } from "../services/member.service";

export async function memberProfile(req: Request, res: Response) {
  try {
    // TODO: get data email on decoded JWT token
    const email = "boby.ms378@gmail.com";
    const profile = await getMemberByEmail(email);

    // TODO: create token validation

    // Check data member profile if not exist
    if (!profile) {
      res.status(404).json({
        status: 404,
        message: `Member profile not found`,
      });
    }

    res.status(200).json({
      status: 200,
      message: "Successfully get data member profile",
      data: profile,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
}
