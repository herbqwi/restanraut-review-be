"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Resturante_1 = __importDefault(require("../Types/Moongose-Types/Resturante"));
const AddRestaurant = (data) => {
    const Restaurant = new Resturante_1.default.Restaurant(data).save();
    return Restaurant;
};
exports.default = {
    AddRestaurant
};
