"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRestaurant = void 0;
var IRestaurant;
(function (IRestaurant) {
    let Service;
    (function (Service) {
        Service[Service["DELIVERY"] = 0] = "DELIVERY";
        Service[Service["FREE_WIFI"] = 1] = "FREE_WIFI";
        Service[Service["OUTSIDE_SEATS"] = 2] = "OUTSIDE_SEATS";
        Service[Service["PARKING"] = 3] = "PARKING";
        Service[Service["SUITABLE_FOR_SPECIAL_NEEDS"] = 4] = "SUITABLE_FOR_SPECIAL_NEEDS";
    })(Service = IRestaurant.Service || (IRestaurant.Service = {}));
    let Cuisine;
    (function (Cuisine) {
        Cuisine[Cuisine["SEA_FOOD"] = 0] = "SEA_FOOD";
        Cuisine[Cuisine["FAST_FOOD"] = 1] = "FAST_FOOD";
        Cuisine[Cuisine["HEALTHY"] = 2] = "HEALTHY";
        Cuisine[Cuisine["CHINESE"] = 3] = "CHINESE";
        Cuisine[Cuisine["ITALIAN"] = 4] = "ITALIAN";
        Cuisine[Cuisine["JAPANESE"] = 5] = "JAPANESE";
    })(Cuisine = IRestaurant.Cuisine || (IRestaurant.Cuisine = {}));
})(IRestaurant = exports.IRestaurant || (exports.IRestaurant = {}));
