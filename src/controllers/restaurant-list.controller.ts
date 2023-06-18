import { IRestaurant } from "../interfaces/restaurant";
import Restaurant from "../models/restaurant.model";

const getAllRestaurant = async () => {

  try {  
    const restaurant = await Restaurant.find().sort("name");
    return restaurant;
  } catch (err) {
    console.error(err);
  }
}

export default { getAllRestaurant };