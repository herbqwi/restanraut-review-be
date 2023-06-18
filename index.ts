import express from "express";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import restaurantRouter from "./src/routes/restaurant.route";
import restaurantListRouter from "./src/routes/restaurant-list.router";
import userRouter from './src/routes/user.route'

const app = express();
var cors = require('cors');


app.use(cors())
app.use(bodyParser.json({ limit: '50mb' })); // Increase the limit to 50 MB
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));



app.use('/restaurant', restaurantRouter);
app.use('/restaurant-list', restaurantListRouter);
app.use('/user', userRouter);
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://127.0.0.1:${port}`);
  dbConnect();
});

const dbConnect = () => {
  console.log("connecting to db...");
  mongoose.connect("mongodb://127.0.0.1:27017/restaurant")
    .then(() => {
      console.log(`🤗 [server]: Connected to MongoDB`);
    })
    .catch((err) => {
      console.log(`🤨 [server]: Failed to connect to mongodb ${err}`);
    });
}