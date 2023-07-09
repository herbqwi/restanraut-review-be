import express from 'express';
import { IRestaurant } from './restaurant';

export namespace IUser {

  export enum Role {
    DEFAULT,
    RESTAURANT_OWNER,
    ADMIN,
  }

  export enum SecurityQuestion {
    BIRTH_CITY,
    CHILDHOOD_FRIEND,
    FIRST_PET,
    HIGH_SCHOOL,
    FIRST_JOB
  }

  export interface UserData {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    city?: IRestaurant.City;
    image?: string;
    securityQuestion?: SecurityQuestion,
    securityAnswer?: string,
    role: Role;
    token?: string,
    createdAt: Date;
    updatedAt: Date;
  }

  export interface UserRequest extends express.Request<{}, {}, {}, {}> {
    body: UserData
  }
}