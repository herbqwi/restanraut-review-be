import mongoose, { Mongoose, Schema, model } from "mongoose";
import { IRestaurant } from "../interfaces/restaurant";

const foodSchema = new Schema<IRestaurant.MenuItem>({
  name: {
    type: mongoose.Schema.Types.String,
    required: true
  },

  description: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  restaurantId: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  price: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  calories: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.String,
    required: true
  }




})
const Restaurant_Food_db = mongoose.model<IRestaurant.MenuItem>("Foods", foodSchema)

export default Restaurant_Food_db
