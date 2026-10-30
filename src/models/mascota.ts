export interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string | null;
  edad: number | null;
  peso: string | null;
}

export interface MascotaInput {
  nombre: string;
  especie: string;
  raza?: string | null;
  edad?: number | null;
  peso?: number | null;
}

export interface MascotaUpdate extends MascotaInput {
  id: number;
}
