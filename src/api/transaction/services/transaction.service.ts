import { db } from "../../../config";
import { Balance } from "../entities/balance.entity";

export async function createMemberBalance(user_id: string) {
  const memberBalance = await db.query(`
    INSERT INTO balance(user_id)
	  VALUES ('${user_id}');
`);

  return memberBalance.rows[0];
}

export async function memberBalance(user_id: string) {
  const memberBalance = await db.query(`
    SELECT balance
	  FROM balance
    WHERE user_id = '${user_id}';
`);

  return memberBalance.rows[0];
}
