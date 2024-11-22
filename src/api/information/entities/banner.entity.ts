import { db } from "../../../config";
import { MasterBanner } from "./master-data/master-banner";

export interface Banner {
  id: string;
  banner_name: string;
  banner_image: Text;
  description: Text;
  created_at: Date;
}

// Create new banner table
export const createBanner = async () => {
  try {
    await db.query(`
        CREATE TABLE banner (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        banner_name VARCHAR(255) NOT NULL,
        banner_image TEXT,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
    )`);

    // Insert master data banner
    for (const data of MasterBanner) {
      await db.query(`
          INSERT INTO banner(
	        banner_name, banner_image, description)
          VALUES ('${data.banner_name}', '${data.banner_image}', '${data.description}');
       `);
    }

    console.log("Table Banner created successfully!");
  } catch (error) {
    console.log(error);
  }
};
