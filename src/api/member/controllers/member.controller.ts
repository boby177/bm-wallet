import { Request, Response } from "express";
import { getMemberByEmail, registerMember } from "../services/member.service";
import bcrypt from "bcrypt";
import validator from "validator";
import randomstring from "randomstring";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import {
  TokenPayload,
  verifyToken,
} from "../../../common/services/token.service";

export async function memberProfile(req: Request, res: Response) {
  try {
    // Check data token and decode data token
    const token: any = await verifyToken(req, res);

    if (!token) {
      res.status(401).json({
        status: 108,
        message: "Unauthorized",
      });
      return;
    }

    // Decode token and get data email member
    const decodedToken: any = jwt.decode(token);
    const profile = await getMemberByEmail(decodedToken.userEmail);

    res.status(200).json({
      status: 0,
      message: "Successfully get data member profile",
      data: {
        email: profile.email,
        first_name: profile.first_name,
        last_name: profile.last_name,
        profile_image: profile.profile_image,
      },
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
      message: "Email address is invalid. Please enter a correct email format",
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

  // Generate member code
  const memberCode = randomstring.generate({
    length: 8,
    charset: "alphanumeric",
    capitalization: "uppercase",
  });

  // Register data new member
  await registerMember(email, memberCode, first_name, last_name, hashPassword);

  res.status(201).json({
    status: 0,
    message: "Successfully created new data member",
    data: null,
  });
}

export async function memberLogin(req: Request, res: Response) {
  const { email, password } = req.body;

  // Check data format email
  if (!validator.isEmail(email)) {
    res.status(400).json({
      status: 102,
      message: "Email address is invalid. Please enter a correct email format",
    });
    return;
  }

  // Check if email already exist on member data
  const user = await getMemberByEmail(email);

  if (user === undefined) {
    res.status(422).json({
      status: 102,
      message: "Incorrect email or password member, please try again",
    });
    return;
  }

  // Compare inputted user password with the database
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    res.status(400).json({
      status: 102,
      message: "Incorrect email or password member, please try again",
    });
    return;
  }

  // Set payload for jwt
  const payload: TokenPayload = {
    email: user.email,
    member_code: user.member_code,
  };

  // Generate user access token
  const accessToken = jwt.sign({ payload }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: 0,
    message: "Login successfully",
    token: {
      token: accessToken,
    },
  });
}
