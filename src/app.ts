import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
const app: Application = express();
// using parser
app.use(express());
app.use(cors());

const exicuteServer = async (req: Request, res: Response) => {
  res.send({
    success: true,
    message: 'The Community Debate Arena Server is Running',
  });
};
app.get('/', exicuteServer);
// notFound middleware include here for if any route not found then exicute the middleware
app.use(notFound);

export default app;
