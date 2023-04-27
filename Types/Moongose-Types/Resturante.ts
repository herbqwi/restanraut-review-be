import moongose from "mongoose"


const AddRestaurant = new moongose.Schema({
    Name: "string",
    Address: "string",
    Phone: "string",
    Description: "string",
    Images: ["string"],
    Service: {Name: "string", Icon: "string"},
    ResType: "string",
    Location: "string",
    ImagePreviews: ["string"]


})

 const Restaurant =  moongose.model("Restaurants",AddRestaurant)

export default {
    Restaurant
 }