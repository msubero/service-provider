import express from "express";
import routes from "./routes";
import middleware from './middleware'


const port = 3000;

const app = express();

app.use(middleware.corsHeaders());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(port, () => console.info(`server started on port ${port}`));
