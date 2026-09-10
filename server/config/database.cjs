const mongoose = require("mongoose");

let connectionPromise;

async function connectDatabase() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/clearance_tracker";
  connectionPromise ??= mongoose.connect(uri, {
    serverSelectionTimeoutMS: 8000,
  });

  try {
    await connectionPromise;
    return mongoose.connection;
  } catch (error) {
    connectionPromise = undefined;
    throw error;
  }
}

async function disconnectDatabase() {
  connectionPromise = undefined;
  await mongoose.disconnect();
}

module.exports = { connectDatabase, disconnectDatabase };
