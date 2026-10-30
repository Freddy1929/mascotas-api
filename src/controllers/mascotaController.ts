import { Request, Response } from "express";
import * as mascotaService from "../services/mascotaService";
import { MascotaInput } from "../models/mascota";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isMascotaInput(value: unknown): value is MascotaInput {
  return (
    isObject(value) &&
    typeof value.nombre === "string" &&
    value.nombre.trim().length > 0 &&
    typeof value.especie === "string" &&
    value.especie.trim().length > 0
  );
}

function parseId(value: unknown): number | undefined {
  const id = typeof value === "number" ? value : Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : undefined;
}

function handleServerError(res: Response, error: unknown): void {
  console.error("Error en la API de mascotas:", error);
  res.status(500).json({ mensaje: "Error interno del servidor" });
}

export async function getAll(_req: Request, res: Response): Promise<void> {
  try {
    res.json(await mascotaService.getAll());
  } catch (error) {
    handleServerError(res, error);
  }
}

export async function getByParam(req: Request, res: Response): Promise<void> {
  try {
    const { param } = req.params;
    if (typeof param !== "string") {
      res.status(400).json({ mensaje: "El parámetro de búsqueda no es válido" });
      return;
    }
    if (/^[+-]?\d+$/.test(param)) {
      const id = parseId(param);
      if (id === undefined) {
        res.status(404).json({ mensaje: "Mascota no encontrada" });
        return;
      }
      const mascota = await mascotaService.getById(id);
      if (!mascota) {
        res.status(404).json({ mensaje: "Mascota no encontrada" });
        return;
      }
      res.json(mascota);
      return;
    }

    res.json(await mascotaService.getBySpecies(param));
  } catch (error) {
    handleServerError(res, error);
  }
}

export async function create(req: Request, res: Response): Promise<void> {
  try {
    if (!isMascotaInput(req.body)) {
      res.status(400).json({ mensaje: "Los campos nombre y especie son obligatorios" });
      return;
    }
    res.status(201).json(await mascotaService.create(req.body));
  } catch (error) {
    handleServerError(res, error);
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  try {
    if (!isObject(req.body)) {
      res.status(400).json({ mensaje: "El id es obligatorio y debe ser un entero positivo" });
      return;
    }
    const id = parseId(req.body.id);
    if (id === undefined) {
      res.status(400).json({ mensaje: "El id es obligatorio y debe ser un entero positivo" });
      return;
    }
    if (!isMascotaInput(req.body)) {
      res.status(400).json({ mensaje: "Los campos nombre y especie son obligatorios" });
      return;
    }

    const mascota = await mascotaService.update(id, req.body);
    if (!mascota) {
      res.status(404).json({ mensaje: "Mascota no encontrada" });
      return;
    }
    res.json(mascota);
  } catch (error) {
    handleServerError(res, error);
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  try {
    const bodyId = isObject(req.body) ? req.body.id : undefined;
    const id = parseId(bodyId ?? req.query.id);
    if (id === undefined) {
      res.status(400).json({ mensaje: "El id es obligatorio y debe ser un entero positivo" });
      return;
    }

    if (!(await mascotaService.remove(id))) {
      res.status(404).json({ mensaje: "Mascota no encontrada" });
      return;
    }
    res.json({ mensaje: "Mascota eliminada correctamente" });
  } catch (error) {
    handleServerError(res, error);
  }
}
