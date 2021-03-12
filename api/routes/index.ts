import { Router } from "express";
import clients from "./clients";
import providers from "./providers";

const router = Router();

router.use(
  "/api",
  router
  .use("/clients", clients)
  .use("/providers", providers)
);

export default router;
