import { db } from "../../../config";
import { Response } from "express";

export async function getBanners(res: Response) {
  const bannerTable = await db.query(`
    SELECT banner_name, banner_image, description 
    FROM banner;
`);

  return bannerTable.rows;
}

export async function getServices(res: Response) {
  const bannerTable = await db.query(`
    SELECT service_code, service_name, service_icon, service_tarif
    FROM services;
`);

  return res.status(200).json(bannerTable);
}
