import { Router } from "express";
import clients from "./clients";
import tasks from "./tasks";

const router = Router();

router.use("/api", 
  router
  .use("/clients", clients)
  .use('/tasks', tasks)
);

export default router;
