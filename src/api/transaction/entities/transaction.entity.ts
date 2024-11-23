import { db } from "../../../config";

export interface Transaction {
  id: string;
  user_id: string;
  balance: number;
  created_at: Date;
}

// Create new balance table
export const createTransaction = async () => {
  try {
    await db.query(`
        CREATE TABLE transaction (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL,
        transaction_type VARCHAR(50) NOT NULL,
        invoice_number VARCHAR(50) NOT NULL,
        total_amount INTEGER NOT NULL,
        service_code VARCHAR(50),
        service_name VARCHAR(50),
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES member(id) 
);`);

    console.log("Table Transaction created successfully!");
  } catch (error) {
    console.log(error);
  }
};
