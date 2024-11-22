import { db } from "../../../config";
import { Member } from "../entities/member.entity";

export async function getMembers(): Promise<Member[]> {
  const banners = await db.query(`
    SELECT email, first_name, last_name, profile_image
	  FROM member;
`);

  return banners.rows;
}

export async function getMemberByEmail(email: string): Promise<Member> {
  const banners = await db.query(`
    SELECT email, first_name, last_name, profile_image
	  FROM member
    WHERE email = '${email}';
`);

  return banners.rows[0];
}

export async function registerMember(
  email: string,
  first_name: string,
  last_name: string,
  password: string
) {
  await db.query(`
      INSERT INTO member(
	    email, first_name, last_name, password)
	    VALUES ('${email}', '${first_name}', '${last_name}', '${password}');
  `);

  return null;
}
