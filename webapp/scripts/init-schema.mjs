import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import pg from "pg";

const { Pool } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_SSL } =
  process.env;

if (!DB_HOST || !DB_USERNAME || !DB_DATABASE) {
  console.error(
    "Kredensial database belum diatur. Salin .env.example ke .env dan isi dari email panitia."
  );
  process.exit(1);
}

const pool = new Pool({
  host: DB_HOST,
  port: Number(DB_PORT || 5432),
  database: DB_DATABASE,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  ssl: DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
});

const sql = readFileSync(path.join(__dirname, "..", "lib", "db", "schema.sql"), "utf8");

try {
  await pool.query(sql);
  console.log("Skema edigdev_* berhasil dibuat/diperbarui.");
} catch (err) {
  console.error("Gagal membuat skema:", err.message);
  process.exit(1);
} finally {
  await pool.end();
}
