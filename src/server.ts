import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import swaggerJSDocs from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { db, swaggerConfig } from "./config";
import { createTable } from "./config/table.config";
import MembersRoutes from "./api/member/member.routes";
import InformationsRoutes from "./api/information/information.routes";
import TransactionsRoutes from "./api/transaction/transaction.routes";

const app = express();
const port = process.env.API_PORT;

app.use(cookieParser());
app.use(express.json());

const connectDb = async () => {
  try {
    await db.connect();
    console.log("Database Connected Successfully");

    // Check if data table is not exist
    createTable();
  } catch (error) {
    console.log(error);
  }
};
connectDb();

// List API routes
app.use(InformationsRoutes);
app.use(MembersRoutes);
app.use(TransactionsRoutes);

const specs = swaggerJSDocs(swaggerConfig);
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(specs));

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
