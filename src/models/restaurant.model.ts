import mongoose, { Schema } from 'mongoose';
import { IRestaurant } from '../interfaces/restaurant';

const restaurantSchema = new Schema<IRestaurant.RestaurantData>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: {
      longitude: Number,
      latitude: Number,
    },
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false
  },
  city: {
    type: Number,
    required: false
  },
  images: {
    type: [String],
    required: true,
  },
  cuisine: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  services: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
  companies: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
  reviews: {
    type: [{
      id: String,
      company: mongoose.Schema.Types.Mixed,
      content: {
        type: String,
        required: true,
      },
      positive: String,
      negative: String,
      images: [String],
      starRating: Number,
      userId: {
        type: String,
        required: true,
      }
    }],
    required: false,
  },
  menuItems: {
    type: [{
      name: String,
      ingredients: [String],
      image: String,
      price: Number,
      description: String,
      calories: Number,
      category: String
    }],
    required: false,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const Restaurant = mongoose.model<IRestaurant.RestaurantData>('Restaurant', restaurantSchema);

export default Restaurant;