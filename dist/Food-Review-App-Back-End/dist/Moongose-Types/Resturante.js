"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AddRestaurant = new mongoose_1.default.Schema({
    Name: "string",
    Address: "string",
    Phone: "string",
    Description: "string",
    Images: [File],
    Service: { Name: "string", Icon: "string" },
    ResType: "string",
    Location: "string",
    ImagePreviews: [String]
});
const Restaurant = mongoose_1.default.model("Restaurants", AddRestaurant);
exports.default = {
    Restaurant
};
