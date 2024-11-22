import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJSDocs from "swagger-jsdoc";
import "dotenv/config";
import { db, swaggerConfig } from "./config";
import { createBanner } from "./api/information/entities/banner.entity";
import { createService } from "./api/information/entities/service.entity";

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
// createBanner();
// createService();

const specs = swaggerJSDocs(swaggerConfig);

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(specs));

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
