import { Request, Response } from "express";
import { getBanners, getServices } from "../services/information.service";

export async function BannerList(req: Request, res: Response) {
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

export const ServiceList = async (res: Response) => {
  try {
    const banners = await getServices(res);

    return {
      status: 0,
      message: "Successfully get data services",
      data: banners,
    };
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};
