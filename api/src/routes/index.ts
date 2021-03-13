import { Router } from "express";
import clients from "./clients";
import requests from "./requests";

const router = Router();

router.use("/api", 
  router
  .use("/clients", clients)
  .use('/requests', requests)
);

export default router;
