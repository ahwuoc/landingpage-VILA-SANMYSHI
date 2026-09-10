require("dotenv").config();
const { createApp } = require("./app.cjs");
const { connectDatabase, disconnectDatabase } = require("./config/database.cjs");

const port = Number(process.env.TRACKING_PORT || process.env.PORT || 4000);

async function start() {
  await connectDatabase();
  const app = createApp();
  const server = app.listen(port, () => {
    console.log(`VILA tracking API ready at http://localhost:${port}/api`);
  });

  async function shutdown(signal) {
    console.log(`${signal} received, closing tracking API...`);
    server.close(async () => {
      await disconnectDatabase();
      process.exit(0);
    });
  }

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

start().catch((error) => {
  console.error("Unable to start tracking API:", error.message);
  process.exit(1);
});
