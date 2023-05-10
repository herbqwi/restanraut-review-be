import { IRestaurant } from "../interfaces/restaurant";
import Restaurant from "../models/restaurant.model";


const createNewRestaurant = async (restaurant: IRestaurant.RestaurantData) => {
  const newRestaurant = new Restaurant(restaurant);
  return await newRestaurant.save();
}

const getRestaurant = async (restaurantId: string) => {
  return await Restaurant.findById(restaurantId);
}

const deleteRestaurat = async (restaurantId: string) => {
  return await Restaurant.findByIdAndDelete(restaurantId);
}

const updateRestaurant = async (restaurantId: string, restaurantData: IRestaurant.RestaurantData) => {
  const updatedRestaurant = Restaurant.findByIdAndUpdate(restaurantId, restaurantData);
  return await (new Restaurant(updatedRestaurant)).save();
}

const getReviews = async (restaurantId: string) => {
  const restaurant = await Restaurant.findById(restaurantId);

  if (!restaurant) {
    throw new Error('Restaurant not found');
  }

  return restaurant?.reviews ?? [];
}

const addReview = async (restaurantId: string, review: IRestaurant.Review) => {
  const restaurant = await Restaurant.findById(restaurantId);

  if (!restaurant) {
    throw new Error('Restaurant not found');
  }

  restaurant.reviews = restaurant.reviews ?? [];
  restaurant.reviews.push(review);
  await restaurant.save();
  return review;
};

const deleteReview = async (restaurantId: string, reviewId: string) => {
  const restaurant = await Restaurant.findById(restaurantId);

  if (!restaurant || !restaurant.reviews || !restaurant.reviews.length) {
    throw new Error('Restaurant not found');
  }
  const reviews: IRestaurant.Review[] = restaurant.reviews;

  restaurant.reviews = reviews.filter(review => { console.log(review._id); return review._id != reviewId });

  await restaurant.save();
  return { message: 'Review deleted successfully' };
};

export default { createNewRestaurant, getRestaurant, deleteRestaurat, updateRestaurant, getReviews, addReview, deleteReview };