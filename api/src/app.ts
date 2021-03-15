import express from "express";
import routes from "./routes";
import { corsHeaders } from "./middleware";

const app = express();
app.use(corsHeaders());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(routes);

export default app;
