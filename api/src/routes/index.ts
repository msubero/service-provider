import { Router } from "express";
import clients from "./clients";
import services from "./services";

const router = Router();

router.use("/api", 
  router
  .use("/clients", clients)
  .use('/services', services)
);

export default router;
