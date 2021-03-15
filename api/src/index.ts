import app from "./app";

const storage = require("node-persist");

const port = 3000;

(async () => {
  // await storage.init();
  // await storage.setItem("acceptedServices", []);
  app.listen(port, () => console.info(`server started on port ${port}`));
})();
