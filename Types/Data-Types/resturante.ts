import express from 'express';
import Request from 'express';
export namespace Restaurant {

    export interface IRestaurantData {
        Name: string;
        Address: string;
        Phone: string;
        Description: string;
        Images: string[];
        Service: IService[];
        ResType: string;
        Location: string;
        clicked: boolean;
        ImagePreviews: string[];
    }

    interface IService {
        ServiceName: string;
        ServiceIcon: string;
    }
}
export interface RestaurantRequest extends express.Request<{},{},{},{}> {
    body: Restaurant.IRestaurantData
}


