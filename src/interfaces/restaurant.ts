import mongoose from "mongoose";
import express from 'express';

export namespace IRestaurant {

  export enum Service {
    DELIVERY,
    FREE_WIFI,
    OUTSIDE_SEATS,
    PARKING,
    BUFFET,
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

  export enum Company {
    FAMILY,
    FRIENDS
  }

  export interface Review {
    _id: string;
    company: Company,
    content: string,
    positive: string,
    negative: string,
    images?: string[];
    starRating: number;
    userId: string;
  }

  export interface MenuItem {
    name: string;
    description: string;
    ingredients: (string | null)[];
    image: string;
    price: number;
    calories: number;
    category: string;
  }

  export interface Location {
    longitude: number,
    latitude: number,
  }

  export interface RestaurantData {
    _id: string;
    name: string;
    description: string;
    address: string;
    location: Location;
    phoneNumber: string;
    images: string[];
    cuisine: Cuisine;
    services: Service[];
    reviews?: Review[];
    menuItems?: MenuItem[],
    ownerId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface RestaurantRequest extends express.Request<{}, {}, {}, {}> {
    body: RestaurantData
  }

}