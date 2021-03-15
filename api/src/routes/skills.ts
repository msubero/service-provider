import { Router } from "express";
import SkillsController from "../controllers/skills";

const router = Router();

router.get("/", SkillsController.fetchSkills);
router.get("/levels", SkillsController.fetchLevels);


export default router;
