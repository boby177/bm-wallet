import { db } from "../../../config";
import { Balance } from "../entities/balance.entity";

export async function createMemberBalance(user_id: string) {
  await db.query(`
      INSERT INTO balance(user_id)
      VALUES ('${user_id}');
  `);

  return null;
}

export async function memberBalance(user_id: string) {
  const memberBalance = await db.query(`
      SELECT balance
      FROM balance
      WHERE user_id = '${user_id}';
  `);

  return memberBalance.rows[0];
}

export async function topupBalance(
  user_id: string,
  transaction_type: string,
  invoice_number: string,
  description: string,
  top_up_amount: number
) {
  await db.query(`
      INSERT INTO transaction(
      user_id, transaction_type, invoice_number, total_amount, description)
	    VALUES ('${user_id}', '${transaction_type}', '${invoice_number}', '${top_up_amount}', '${description}');
  `);

  return null;
}

export async function updateMemberBalance(
  user_id: string,
  balance_amount: number
) {
  await db.query(`
      UPDATE balance
      SET balance = '${balance_amount}'
      WHERE user_id = '${user_id}';
  `);

  return null;
}
