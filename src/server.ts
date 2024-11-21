import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJSDocs from "swagger-jsdoc";
import { db } from "./config/database";
import { swaggerConfig } from "./config/swagger";
import "dotenv/config";

const app = express();
const port = process.env.API_PORT;

const connectDb = async () => {
  try {
    await db.connect();

    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};
connectDb();

const specs = swaggerJSDocs(swaggerConfig);

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(specs));

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
