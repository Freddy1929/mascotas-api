import "dotenv/config";
import cors from "cors";
import express from "express";
import { initializeDatabase, pool } from "./config/database";
import mascotaRoutes from "./routes/mascotaRoutes";

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(cors());
app.use(express.json());
app.use("/mascota", mascotaRoutes);

async function start(): Promise<void> {
  try {
    await initializeDatabase();
    app.listen(port, () => {
      console.log(`API de mascotas escuchando en el puerto ${port}`);
    });
  } catch (error) {
    console.error("No se pudo inicializar la base de datos:", error);
    await pool.end();
    process.exitCode = 1;
  }
}

void start();
