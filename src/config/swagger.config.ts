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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [
    "./src/api/member/member.routes.ts",
    "./src/api/information/information.routes.ts",
    "./src/api/transaction/transaction.routes.ts",
  ],
};
