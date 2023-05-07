"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const restaurant_1 = __importDefault(require("../Controller/restaurant"));
const fs = require('fs');
const path = require('path');
const route = express_1.default.Router();
route.get("/Restaurant-Form", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ResturanteList = yield restaurant_1.default.GetRestaurant();
        if (ResturanteList)
            res.status(200).send(ResturanteList).end();
        else
            res.status(404).send("some ERRor shown!").end();
    }
    catch (error) {
        res.status(404).send(error).end();
    }
}));
route.post("/Restaurant-Form", (req, res) => {
    try {
        const AddRes = restaurant_1.default.AddRestaurant(req.body);
        if (AddRes)
            res.status(201).send(AddRes);
        else
            res.status(201).send([]);
    }
    catch (error) {
        res.status(404).send(error);
    }
});
route.delete("/Restaurant-Form/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const delrest = restaurant_1.default.DeleteRestaurant(id);
        if (!delrest)
            res.status(201).send("Succeed!");
    }
    catch (error) {
        res.status(404).send(error);
    }
});
route.put("/Restaurant-Form/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.is("application/json")) {
            const newinfo = yield restaurant_1.default.UpdateRestaurant(req.params.id, req.body);
            res.status(201).send(newinfo);
        }
        else {
            res.status(415).send("Unsupported Media Type");
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
route.post('/upload', function (req, res) {
    const imageDataUrl = req.body.images;
    const base64Data = imageDataUrl.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const filePath = path.join(__dirname, 'C:\Users\anjja\Desktop\images.jpg', 'myimage.jpg');
    fs.writeFile(filePath, buffer, function (err) {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        }
        else {
            res.sendStatus(200);
        }
    });
});
exports.default = route;
