"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Resturante_1 = __importDefault(require("../Types/Moongose-Types/Resturante"));
const AddRestaurant = (data) => {
    const Restaurant = new Resturante_1.default.Restaurant(data).save();
    return Restaurant;
};
const GetRestaurant = () => __awaiter(void 0, void 0, void 0, function* () {
    const Restaurant = yield Resturante_1.default.Restaurant.find();
    return Restaurant;
});
const DeleteRestaurant = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const Restaurant = yield Resturante_1.default.Restaurant.findByIdAndDelete(id);
    return Restaurant;
});
const UpdateRestaurant = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const Restaurant = yield Resturante_1.default.Restaurant.findByIdAndUpdate(id, Object.assign({}, data));
    new Resturante_1.default.Restaurant(Restaurant).save();
    return Restaurant;
});
exports.default = {
    AddRestaurant,
    GetRestaurant,
    DeleteRestaurant,
    UpdateRestaurant
};
