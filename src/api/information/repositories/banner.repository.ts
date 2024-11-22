import { db } from "../../../config";
import { Request, Response } from "express";

export const getBanners = async (res: Response) => {
  const bannerTable = await db.query(`SELECT * FROM banners`);

  return res.status(200).json(bannerTable);
};
