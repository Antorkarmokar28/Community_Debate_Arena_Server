// getting-started.js
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { Server, IncomingMessage, ServerResponse } from "http";
let server: Server<typeof IncomingMessage, typeof ServerResponse> | undefined;
async function main() {
  await mongoose.connect(config.database_url as string);
  try {
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
// using unhandledRejection for asynchonouse code
process.on("unhandledRejection", () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
// using uncaughtException for synchonouse code
process.on("uncaughtException", () => {
  process.exit(1);
});
