import { Request, Response } from "express";
import { getMemberByEmail, registerMember } from "../services/member.service";
import bcrypt from "bcrypt";
import validator from "validator";

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
      return;
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

export async function memberRegister(req: Request, res: Response) {
  const { email, first_name, last_name, password } = req.body;

  // Check data format email
  if (!validator.isEmail(email)) {
    res.status(400).json({
      status: 102,
      message: "Email address is invalid. Please enter a correct email format.",
    });
    return;
  }

  // Check if email already exist on member data
  const userEmail = await getMemberByEmail(email);
  if (userEmail !== undefined) {
    res.status(422).json({
      status: 102,
      message: `Email with ${email} already exist, please use different email`,
    });
    return;
  }

  // Check data user password
  if (password.length !== 8) {
    res.status(400).json({
      status: 102,
      message: "Password length must be at least 8 characters",
    });
    return;
  }

  // Hash data password user
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  // Register data new member
  await registerMember(email, first_name, last_name, hashPassword);

  res.status(201).json({
    status: 201,
    message: "Successfully created new data member",
    data: null,
  });
}
