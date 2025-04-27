import dotenv from "dotenv";
import "./config/env";
import { startServer } from "./core/server";

dotenv.config();

startServer();
