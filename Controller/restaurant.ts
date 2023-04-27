import { Restaurant } from "../Types/Data-Types/resturante"
import RestaurantMoongose from "../Types/Moongose-Types/Resturante"

const AddRestaurant = (data: Restaurant.IRestaurantData) => {


    const Restaurant = new RestaurantMoongose.Restaurant(data).save()

    return Restaurant
}



export default {

    AddRestaurant
}