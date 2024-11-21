import "dotenv/config";

export const swaggerConfig = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BM Wallet API",
      version: "1.0.0",
      description: "BM Wallet API documentation",
    },
    servers: [
      {
        url: "http://localhost:3030",
      },
    ],
  },
  apis: [
    "./src/api/member/routes/member.routes.ts",
    "./src/api/information/routes/information.routes.ts",
    "./src/api/transaction/routes/transaction.routes.ts",
  ],
};
