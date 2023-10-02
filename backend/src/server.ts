import express from "express";
import cors from "cors";

import { PostgresDataSource } from "./database/app-data-source";
import routes from "./routes";

PostgresDataSource.initialize().then(() => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(routes);

  return app.listen(process.env.SERVER_PORT, () => {
    console.log("Server is running...");
  });
});
