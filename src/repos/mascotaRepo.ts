import { pool } from "../config/database";
import { Mascota, MascotaInput } from "../models/mascota";

export async function findAll(): Promise<Mascota[]> {
  const result = await pool.query<Mascota>("SELECT * FROM mascota ORDER BY id");
  return result.rows;
}

export async function findBySpecies(especie: string): Promise<Mascota[]> {
  const result = await pool.query<Mascota>(
    "SELECT * FROM mascota WHERE LOWER(especie) = LOWER($1) ORDER BY id",
    [especie],
  );
  return result.rows;
}

export async function findById(id: number): Promise<Mascota | undefined> {
  const result = await pool.query<Mascota>("SELECT * FROM mascota WHERE id = $1", [id]);
  return result.rows[0];
}

export async function create(input: MascotaInput): Promise<Mascota> {
  const result = await pool.query<Mascota>(
    `INSERT INTO mascota (nombre, especie, raza, edad, peso)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [input.nombre, input.especie, input.raza ?? null, input.edad ?? null, input.peso ?? null],
  );
  return result.rows[0];
}

export async function update(id: number, input: MascotaInput): Promise<Mascota | undefined> {
  const result = await pool.query<Mascota>(
    `UPDATE mascota
     SET nombre = $1, especie = $2, raza = $3, edad = $4, peso = $5
     WHERE id = $6
     RETURNING *`,
    [input.nombre, input.especie, input.raza ?? null, input.edad ?? null, input.peso ?? null, id],
  );
  return result.rows[0];
}

export async function remove(id: number): Promise<boolean> {
  const result = await pool.query("DELETE FROM mascota WHERE id = $1 RETURNING id", [id]);
  return result.rowCount !== 0;
}
