import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import  RestaurantRoute from './Routes/restaurant';
import cors from 'cors';


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8050;
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json())

app.use("/Restauran",RestaurantRoute)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  dbConnection()
});

const dbConnection = () => {
mongoose.connect("mongodb://127.0.0.1:27017/Food-Review")
.then(()=>
{
  console.log('🟢🟢🟢 [server]: connection established 🟢🟢🟢	')
}).catch( (err) => {
  console.log(`🔴🔴🔴 [server]: Failed to connect 🔴🔴🔴 , ${err}`)
})
}