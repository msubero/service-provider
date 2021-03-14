import { Router } from "express";
import { datesConflictErrorHandler } from "../middleware/services";
import ServicesController from "../controllers/services";

const router = Router();

router.post("/", datesConflictErrorHandler, ServicesController.accept);

export default router;
