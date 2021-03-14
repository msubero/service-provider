import express from "express";
import routes from "./routes";
import { corsHeaders } from "./middleware";
const storage = require("node-persist");

const port = 3000;

const app = express();
app.use(corsHeaders());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(routes);

(async () => {
  await storage.init();
  await storage.setItem("acceptedServices", []);
  app.listen(port, () => console.info(`server started on port ${port}`));
})();

export default app;