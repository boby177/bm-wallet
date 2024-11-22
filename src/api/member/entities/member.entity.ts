import { db } from "../../../config";

export interface Member {
  id: string;
  email: string;
  member_code: string;
  first_name: string;
  last_name: string;
  password: string;
  profile_image: Text;
  created_at: Date;
}

// Create new member table
export const createMember = async () => {
  try {
    await db.query(`
        CREATE TABLE member (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) NOT NULL UNIQUE,
        member_code VARCHAR(8) NOT NULL UNIQUE,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        profile_image TEXT,
        created_at TIMESTAMP DEFAULT NOW()
);`);

    console.log("Table Member created successfully!");
  } catch (error) {
    console.log(error);
  }
};
