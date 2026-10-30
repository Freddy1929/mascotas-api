import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function initializeDatabase(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS mascota (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      especie VARCHAR(50) NOT NULL,
      raza VARCHAR(100),
      edad INT,
      peso NUMERIC(5,2)
    )
  `);
}
