import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { connectDB } from "./config/db.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

async function requireDB(_req: Request, _res: Response, next: NextFunction) {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("CORS origin not allowed"));
    },
  }),
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/tasks", requireDB, taskRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error.message === "CORS origin not allowed") {
    res.status(403).json({ message: error.message });
    return;
  }

  res.status(500).json({ message: "Internal server error" });
});

export default app;
