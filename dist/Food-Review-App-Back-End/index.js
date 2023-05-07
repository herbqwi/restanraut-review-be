"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const restaurant_1 = __importDefault(require("./Routes/restaurant"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8050;
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
app.use(express_1.default.json());
app.use(express_1.default.static('images'));
app.use("/Restauran", restaurant_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    dbConnection();
});
const dbConnection = () => {
    mongoose_1.default.connect("mongodb://127.0.0.1:27017/Food-Review")
        .then(() => {
        console.log('🟢🟢🟢 [server]: connection established 🟢🟢🟢	');
    }).catch((err) => {
        console.log(`🔴🔴🔴 [server]: Failed to connect 🔴🔴🔴 , ${err}`);
    });
};
