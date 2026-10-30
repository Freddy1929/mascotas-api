CREATE TABLE IF NOT EXISTS mascota (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  especie VARCHAR(50) NOT NULL,
  raza VARCHAR(100),
  edad INT,
  peso NUMERIC(5,2)
);

INSERT INTO mascota (nombre, especie, raza, edad, peso) VALUES
  ('Max', 'perro', 'Labrador', 4, 28.50),
  ('Luna', 'gato', 'Siamés', 2, 4.20),
  ('Piolin', 'ave', 'Canario', 1, 0.03);
