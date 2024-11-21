import express from "express";
import bodyParser from "body-parser";
import swaggerUI from "swagger-ui-express";
import swaggerJSDocs from "swagger-jsdoc";
import { options } from "./config/swagger.js";

const app = express();
const port = 3000;
const specs = swaggerJSDocs(options);

app.use(bodyParser.json());
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(specs));

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
