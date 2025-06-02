import { Router } from "express";
import {
  askModelController,
  askModelWithSystemContentController,
  askModelWithToolsController,
} from "../controllers/models.controller";

const router = Router();

/**
 * Endpoint for sending questions directly to the language model.
 * @route POST /ask
 * @param {Object} req.body - Request body
 * @param {string} req.body.question - Question to process
 */
router.post("/ask", askModelController);

router.post("/ask-with-system-content", askModelWithSystemContentController);

router.post("/ask-with-tools", askModelWithToolsController);

export default router;
