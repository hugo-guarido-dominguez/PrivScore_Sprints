import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import healthRouter from "./routes/health.js";
import servicesRouter from "./routes/services.routes.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();

await connectDB();

// CORS: permite varias origins separadas por coma (útil para CRA 3000 y Vite 5173)
const allowedOrigins = (process.env.CORS_ORIGIN ?? "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    // origin puede ser undefined en Postman/curl o same-origin
    if (!origin) return cb(null, true);
    if (allowedOrigins.length === 0) return cb(null, true); // si no configuras nada, no bloquees
    return cb(null, allowedOrigins.includes(origin));
  },
}));

app.use(express.json());

// Ruta raíz (para que no salga "Cannot GET /")
app.get("/", (_req, res) => {
  res.json({
    name: "PrivScore Backend",
    ok: true,
    endpoints: {
      health: "/api/health",
      services: "/api/services",
    },
  });
});

// Rutas API
app.use("/api/health", healthRouter);
app.use("/api/services", servicesRouter);

// 404 para rutas no existentes
app.use((_req, res) => {
  res.status(404).json({ ok: false, error: "Not Found" });
});

// Handler de errores
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ ok: false, error: "Internal Server Error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});