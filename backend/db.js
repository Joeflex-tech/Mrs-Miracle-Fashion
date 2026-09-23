import pg from "pg";
import "dotenv/config";
const { Pool } = pg;
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export async function q(text, params = []) {
  const r = await pool.query(text, params);
  return r.rows;
}
