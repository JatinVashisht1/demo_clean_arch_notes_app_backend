import express, {Request, Response, Express} from "express";
import * as dotenv from 'dotenv';
import morgan from 'morgan';


dotenv.config()

const app: Express = express()
app.use(express.json())
const port: number = process.env.DEV_PORT as unknown as number;
app.use(morgan('combined'))
export default app;