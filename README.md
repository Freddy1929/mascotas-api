# mascotas-api

API REST para administrar mascotas. Está construida con Node.js, Express y TypeScript, y persiste los datos en PostgreSQL mediante `pg`.

## Requisitos

- Node.js y npm
- Docker con PostgreSQL disponible en el puerto `5432`

La API crea la tabla `mascota` al iniciar si todavía no existe. El script [db/mascotas_db.sql](./db/mascotas_db.sql) contiene el esquema y datos de ejemplo para perros, gatos y aves; ejecútalo en la base `mascotas_db` si deseas cargar esos ejemplos.

Por ejemplo, puedes iniciar un contenedor PostgreSQL con:

```bash
docker run --name mascotas-postgres -e POSTGRES_PASSWORD=admin123 -e POSTGRES_DB=mascotas_db -p 5432:5432 -d postgres
```

## Configuración

1. Copia `.env.example` a `.env`.
2. Configura `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` y `PORT` según tu PostgreSQL.
3. Inicia PostgreSQL en Docker y asegúrate de que la base de datos indicada (`mascotas_db` por defecto) exista.

Las credenciales de `.env` son configuración local y no se incluyen en Git.

## Ejecución

```bash
npm install
npm run dev
```

La API queda disponible en `http://localhost:4000`. Para compilar y ejecutar la versión generada:

```bash
npm run build
npm start
```

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/mascota` | Devuelve todas las mascotas. |
| GET | `/mascota/:param` | Si `param` es un entero, busca por ID y devuelve 404 si no existe; en otro caso busca por especie sin distinguir mayúsculas/minúsculas. |
| POST | `/mascota` | Crea una mascota y responde 201. Requiere `nombre` y `especie`. |
| PUT | `/mascota` | Actualiza una mascota. Requiere `id`, `nombre` y `especie` en el body. |
| DELETE | `/mascota` | Elimina una mascota. Recibe `id` en el body JSON o como query param `?id=...`. |

Las rutas GET para especie e ID tienen la misma forma (`/mascota/:param`), por lo que se resuelven en una sola ruta: los parámetros enteros se interpretan como ID y los demás como especie.

### Ejemplos

Crear una mascota:

```json
{
  "nombre": "Milo",
  "especie": "gato",
  "raza": "Europeo",
  "edad": 3,
  "peso": 5.25
}
```

Actualizar una mascota (`PUT /mascota`):

```json
{
  "id": 1,
  "nombre": "Max",
  "especie": "perro",
  "raza": "Labrador",
  "edad": 5,
  "peso": 29.1
}
```

Eliminar con body (`DELETE /mascota`):

```json
{
  "id": 1
}
```

También se puede eliminar con `DELETE /mascota?id=1`.
