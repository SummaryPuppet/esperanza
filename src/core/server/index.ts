import express from "express";
import { sseGetController, ssePostController } from "./mcp";

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/sse", sseGetController);

app.post("/sse", ssePostController);

export const startServer = () => {
  app.listen(port, () =>
    console.log(`Server is running at http://localhost:${port}`)
  );
};
