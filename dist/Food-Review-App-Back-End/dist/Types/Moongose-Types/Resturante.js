"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = __importDefault(require("mongoose"));
const AddRestaurant = new mongoose_1.default.Schema({
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
    ownerId: mongoose_2.default.Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
const Restaurant = mongoose_1.default.model("Restaurants", AddRestaurant);
exports.default = {
    Restaurant
};
