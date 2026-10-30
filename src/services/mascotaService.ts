import * as mascotaRepo from "../repos/mascotaRepo";
import { MascotaInput } from "../models/mascota";

export function getAll() {
  return mascotaRepo.findAll();
}

export function getById(id: number) {
  return mascotaRepo.findById(id);
}

export function getBySpecies(especie: string) {
  return mascotaRepo.findBySpecies(especie);
}

export function create(input: MascotaInput) {
  return mascotaRepo.create(input);
}

export function update(id: number, input: MascotaInput) {
  return mascotaRepo.update(id, input);
}

export function remove(id: number) {
  return mascotaRepo.remove(id);
}
