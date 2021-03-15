import { Router } from "express";
import skills from "./skills";
import clients from "./clients";
import services from "./services";

const router = Router();

router.use(
  "/api",
  router
    .use("/skills", skills)
    .use("/clients", clients)
    .use("/services", services)
);

export default router;
