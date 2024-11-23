import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJSDocs from "swagger-jsdoc";
import { db, swaggerConfig } from "./config";
import MembersRoutes from "./api/member/member.routes";
import InformationsRoutes from "./api/information/information.routes";
import TransactionsRoutes from "./api/transaction/transaction.routes";
import { createBanner } from "./api/information/entities/banner.entity";
import { createService } from "./api/information/entities/service.entity";
import { createMember } from "./api/member/entities/member.entity";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();
const port = process.env.API_PORT;

app.use(cookieParser());
app.use(express.json());

const connectDb = async () => {
  try {
    await db.connect();

    // Create table list
    // createBanner();
    // createService();
    // createMember();

    console.log("Database Connected Successfully");
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
