import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJSDocs from "swagger-jsdoc";
import { options } from "./config/swagger.js";
import { db } from "./config/database.js";

const app = express();
const port = 3000;

const connectDb = async () => {
  try {
    await db.connect();

    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};
connectDb();

const specs = swaggerJSDocs(options);

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(specs));

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
