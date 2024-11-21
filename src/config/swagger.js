export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BM Wallet API",
      version: "1.0.0",
      description: "BM Wallet API documentation",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./api/routes/*.js"],
};