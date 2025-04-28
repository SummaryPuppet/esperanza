import { Router } from "express";
import {
  sseGetController,
  ssePostController,
} from "../controllers/mcp.controller";

const router = Router();

router.get("/sse", sseGetController);
router.post("/sse", ssePostController);

export default router;
