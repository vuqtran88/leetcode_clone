import express from "express";
import cors from "cors";
import { notFound, errorHandler } from "./middlewares";
import problemRoutes from "./routes/problemRoutes";
import mongoose from "mongoose";
import AppConfig from "./config/app";

mongoose.connect(AppConfig.MONGO_URI);

const app = express();

/* app default middlewares */
app.use(cors());
app.use(express.json());

/* routes */
app.use("/api", problemRoutes);

/* custom middlewares */
app.use(notFound);
app.use(errorHandler);

export default app;
