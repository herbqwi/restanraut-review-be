/* eslint-disable import/no-anonymous-default-export */
import { IRestaurant } from "../Types/Data-Types/resturante"
import RestaurantMoongose from "../Types/Moongose-Types/Resturante"

const AddRestaurant = (data: IRestaurant.RestaurantRequest) => {


    const Restaurant = new RestaurantMoongose.Restaurant(data).save()


    return Restaurant
}

const GetRestaurant = async () => {


    const Restaurant = await RestaurantMoongose.Restaurant.find()
    return Restaurant
}
const DeleteRestaurant = async (id: string) => {


    const Restaurant = await RestaurantMoongose.Restaurant.findByIdAndDelete(id)
    return Restaurant
}


const UpdateRestaurant = async (id: string, data: IRestaurant.RestaurantRequest) => {


    const Restaurant = await RestaurantMoongose.Restaurant.findByIdAndUpdate(id, { ...data })
    new RestaurantMoongose.Restaurant(Restaurant).save()
    return Restaurant
}



export default {
    AddRestaurant,
    GetRestaurant,
    DeleteRestaurant,
    UpdateRestaurant
}