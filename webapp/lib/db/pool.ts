import { Pool } from "pg";

let pool: Pool | null = null;

export function getPool(): Pool {
  if (pool) return pool;

  const { DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_SSL } =
    process.env;

  if (!DB_HOST || !DB_USERNAME || !DB_DATABASE) {
    throw new Error(
      "Kredensial database belum diatur. Salin webapp/.env.example ke webapp/.env dan isi dari email panitia."
    );
  }

  pool = new Pool({
    host: DB_HOST,
    port: Number(DB_PORT || 5432),
    database: DB_DATABASE,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    ssl: DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
    max: 5,
  });

  return pool;
}

export const TABLE_PREFIX = process.env.TABLE_PREFIX || "edigdev_";

export function t(tableName: string): string {
  return `${TABLE_PREFIX}${tableName}`;
}
