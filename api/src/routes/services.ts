import { Router } from "express";
import { datesConflictErrorHandler, validateSchema } from "../middleware/services";
import ServicesController from "../controllers/services";

const router = Router();

router.post("/", validateSchema, datesConflictErrorHandler, ServicesController.accept);

export default router;
