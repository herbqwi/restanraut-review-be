import express from 'express';
import mongoose from 'mongoose';


export namespace IRestaurant {
 export enum  Service {
    DELIVERY,
    FREE_WIFI,
    OUTSIDE_SEATS,
    PARKING,
    SUITABLE_FOR_SPECIAL_NEEDS,
  }

  export enum Cuisine {
    SEA_FOOD,
    FAST_FOOD,
    HEALTHY,
    CHINESE,
    ITALIAN,
    JAPANESE,
  }

  

  export  interface IRestaurantData {
    _id: string;
    name: string;
    description: string;
    address: string;
    location: string;
    phoneNumber: number;
    images: string;
    cuisine: Cuisine;
    services: Service[];
    reviews: IReview[];
    menuItems: IMenuItem[],
    ownerId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }
  export interface RestaurantRequest extends express.Request<{}, {}, {}, {}> {
    body: IRestaurantData
  }
 
}
export interface IReview {
  accountname: string
  content: string;
  images: string;
  starRating: number;
}

export interface IMenuItem {
  name: string;
  ingredients: (string | null)[];
  image: string;
  price: number;
  description: string;
  calories: number;
  category: string;
}





