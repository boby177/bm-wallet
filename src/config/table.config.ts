import { db } from "./database.config";
import { createBanner } from "../api/information/entities/banner.entity";
import { createService } from "../api/information/entities/service.entity";
import { createMember } from "../api/member/entities/member.entity";
import { createBalance } from "../api/transaction/entities/balance.entity";
import { createTransaction } from "../api/transaction/entities/transaction.entity";

export const createTable = async () => {
  // Check data table list
  const tableBanner = await db.query(`
    SELECT EXISTS (
      SELECT 1
      FROM   pg_catalog.pg_tables
      WHERE  tablename = 'banner'
      )
  `);

  const tableServices = await db.query(`
    SELECT EXISTS (
      SELECT 1
      FROM   pg_catalog.pg_tables
      WHERE  tablename = 'services'
      )
  `);

  const tableMember = await db.query(`
    SELECT EXISTS (
      SELECT 1
      FROM   pg_catalog.pg_tables
      WHERE  tablename = 'member'
      )
  `);

  const tableBalance = await db.query(`
    SELECT EXISTS (
      SELECT 1
      FROM   pg_catalog.pg_tables
      WHERE  tablename = 'balance'
      )
  `);

  const tableTransaction = await db.query(`
    SELECT EXISTS (
      SELECT 1
      FROM   pg_catalog.pg_tables
      WHERE  tablename = 'transaction'
      )
  `);

  // Create data table if the status exist not true
  if (tableBanner.rows[0].exists !== true) {
    await createBanner();
  }

  if (tableServices.rows[0].exists !== true) {
    await createService();
  }

  if (tableMember.rows[0].exists !== true) {
    await createMember();
  }

  if (tableBalance.rows[0].exists !== true) {
    await createBalance();
  }

  if (tableTransaction.rows[0].exists !== true) {
    await createTransaction();
  }
};
