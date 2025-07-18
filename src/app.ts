import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import router from './app/router';
import globalErrorHandeling from './app/middlewares/globalErrorHandeling';
const app: Application = express();
// using parser
app.use(express());
app.use(cookieParser());
app.use(cors());
// application route
app.use('/api', router);

const exicuteServer = async (req: Request, res: Response) => {
  res.send({
    success: true,
    message: 'The Community Debate Arena Server is Running',
  });
};

app.get('/', exicuteServer);
// global error handeler
app.use(globalErrorHandeling);
// api notFound middleware
app.use(notFound);

export default app;
