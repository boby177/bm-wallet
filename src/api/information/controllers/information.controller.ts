import { Request, Response } from "express";
import { getBanners, getServices } from "../services/information.service";

export async function bannerList(req: Request, res: Response) {
  try {
    const banners = await getBanners(res);

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
    const services = await getServices(res);

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
