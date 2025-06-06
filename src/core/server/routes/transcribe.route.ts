import { Router } from "express";
import { transcribePostController } from "../controllers/transcribe.controller";
import { upload } from "../storage";

const router = Router();

router.post(
  "/transcribe",
  upload.single("audioFile"),
  transcribePostController
);

export default router;
