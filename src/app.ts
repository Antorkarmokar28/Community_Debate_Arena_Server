import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();
// using parser
app.use(express());
app.use(cors());

const exicuteServer = async (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "The Community Debate Arena Server is Running",
  });
};
app.get("/", exicuteServer);

export default app;
