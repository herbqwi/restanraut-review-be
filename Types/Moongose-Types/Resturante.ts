import moongose from "mongoose"
import mongoose from "mongoose"


const AddRestaurant = new moongose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    location: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    images: { type: String, required: true },
    cuisine: { type: String, required: true },
    services: [{ type: String, required: true }],
    reviews: [{
    accountname: "string",
    content: "string",
    images: "string",
    starRating: Number
    }],
    menuItems: [{
        name: "string",
        ingredients: ["string"],
        image: "string",
        price: Number,
        description: "string",
        calories: "string",
        category: Number
    }],
    ownerId: mongoose.Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const Restaurant = moongose.model("Restaurants", AddRestaurant)

export default {
    Restaurant
}