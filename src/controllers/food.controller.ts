/* eslint-disable import/no-anonymous-default-export */

import { IRestaurant } from "../interfaces/restaurant"
import Restaurant_Food_db from "../models/food.model";


const AddFood = async (data: IRestaurant.MenuItem) => {


  const Food = await new Restaurant_Food_db(data).save()
  return Food;
}

const GetFood = async (id: string) => {


  const Food = await Restaurant_Food_db.findById(id)
  return [Food]
}

const GetRestaurantFood = async (restaurantId: string) => {


  const Food = await Restaurant_Food_db.find({ restaurantId })
  return Food
}


const DeleteFood = async (id: string) => {


  const Food = await Restaurant_Food_db.findByIdAndDelete(id)
  return Food
}


const UpdateFood = async (id: string, data: IRestaurant.RestaurantRequest) => {


  const Food = await Restaurant_Food_db.findByIdAndUpdate(id, { ...data })
  new Restaurant_Food_db(data).save()
  return Food
}



export default {
  AddFood,
  GetFood,
  DeleteFood,
  UpdateFood,
  GetRestaurantFood
}