import { db } from "../../../config";
import { MasterServices } from "./master-data/master-services";

export interface Service {
  id: string;
  service_code: string;
  service_name: string;
  service_icon: Text;
  service_tarif: number;
  created_at: Date;
}

// Create new service table
export const createService = async () => {
  try {
    await db.query(`
        CREATE TABLE services (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        service_code VARCHAR(50) NOT NULL,
        service_name VARCHAR(255) NOT NULL,
        service_icon TEXT,
        service_tarif INTEGER,
        created_at TIMESTAMP DEFAULT NOW()
    )`);

    // Insert master data services
    for (const data of MasterServices) {
      await db.query(`
          INSERT INTO services (service_code, service_name, service_icon, service_tarif)
          VALUES ('${data.service_code}', '${data.service_name}', '${data.service_icon}', '${data.service_tarif}');
      `);
    }

    console.log("Table Service created successfully!");
  } catch (error) {
    console.log(error);
  }
};
