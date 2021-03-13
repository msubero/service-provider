import { Router } from "express";
import TasksController from "../controllers/tasks";

const router = Router();

router.post("/", TasksController.add);

export default router;
