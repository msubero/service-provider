import { Router } from "express";
import { datesConflictHandler } from "../middleware/requests";
import RequestsController from "../controllers/requests";

const router = Router();

router.post("/", datesConflictHandler, RequestsController.add);

export default router;
