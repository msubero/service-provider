import { Router } from "express";
import ClientsController from "../controllers/clients";

const router = Router();

router.get("/requests", ClientsController.fetchBySkills);

export default router;
