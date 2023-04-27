"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const restaurant_1 = __importDefault(require("../Controller/restaurant"));
const route = express_1.default.Router();
route.get("/Restaurant-Form", (req, res) => {
});
route.post("/Restaurant-Form", (req, res) => {
    const AddRes = restaurant_1.default.AddRestaurant(req.body);
    res.status(201).send(AddRes);
});
route.post("/Food-Form", (req, res) => {
});
exports.default = route;
