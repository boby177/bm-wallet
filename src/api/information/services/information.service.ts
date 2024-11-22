import { db } from "../../../config";
import { Response } from "express";
import { Banner } from "../entities/banner.entity";
import { Service } from "../entities/service.entity";

export async function getBanners(res: Response): Promise<Banner[]> {
  const banners = await db.query(`
    SELECT banner_name, banner_image, description 
    FROM banner;
`);

  return banners.rows;
}

export async function getServices(res: Response): Promise<Service[]> {
  const services = await db.query(`
    SELECT service_code, service_name, service_icon, service_tarif
    FROM services;
`);

  return services.rows;
}
