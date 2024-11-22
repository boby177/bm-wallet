import { Request, Response } from "express";
import { getBanners, getServices } from "../services/information.service";
import { verifyToken } from "../../../common/services/token.service";

export async function bannerList(req: Request, res: Response) {
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

    const banners = await getBanners();

    res.status(200).json({
      status: 200,
      message: "Successfully get data banners",
      data: banners,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
}

export async function serviceList(req: Request, res: Response) {
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

    const services = await getServices();

    res.status(200).json({
      status: 200,
      message: "Successfully get data services",
      data: services,
    });
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
}
