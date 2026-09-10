const express = require("express");
const cors = require("cors");
const apiRouter = require("./routes/api.cjs");

function createApp() {
  const app = express();
  const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:3001,http://127.0.0.1:3001")
    .split(",")
    .map((origin) => origin.trim());

  app.disable("x-powered-by");
  app.use(cors({ origin: allowedOrigins, credentials: false }));
  app.use(express.json({ limit: "1mb" }));
  app.use("/api", apiRouter);

  app.use((error, _request, response, _next) => {
    console.error(error);
    response.status(500).json({ message: "Máy chủ không thể xử lý yêu cầu lúc này." });
  });

  return app;
}

module.exports = { createApp };
