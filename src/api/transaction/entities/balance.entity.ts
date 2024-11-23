import { db } from "../../../config";

export interface Balance {
  id: string;
  user_id: string;
  balance: number;
  created_at: Date;
}

// Create new balance table
export const createBalance = async () => {
  try {
    await db.query(`
        CREATE TABLE balance (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL,
        balance INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES member(id) 
);`);

    console.log("Table Balance created successfully!");
  } catch (error) {
    console.log(error);
  }
};
