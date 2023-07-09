import { IRestaurant } from "../interfaces/restaurant";
import Restaurant from "../models/restaurant.model";
import { checkArr } from "../service/general.service";
import { sortRestaurants } from "../service/restaurants.service";
import userController from "./user.controller";


const createNewRestaurant = async (restaurant: IRestaurant.RestaurantData) => {
  console.log(`Creating a new restaurant: `, restaurant)
  const newRestaurant = new Restaurant(restaurant);
  return await newRestaurant.save();
}

const getRestaurant = async (restaurantId: string) => {
  return await Restaurant.findById(restaurantId);
}

const getRestaurantByAddress = async (restaurantAddress: string) => {
  return await Restaurant.find({ address: restaurantAddress });
}

const getRestaurants = async ({ name, services, cuisines, companies, city, sortedBy }: { name: string, services: IRestaurant.Service[], cuisines: IRestaurant.Cuisine[], companies: IRestaurant.Company[], city: IRestaurant.City, sortedBy: IRestaurant.SortedBy }) => {
  const restaurants: IRestaurant.RestaurantData[] = await Restaurant.find();
  const filteredRestaurants = restaurants.filter(restaurant => {
    console.log(`checkArr: `, checkArr(restaurant.services, services))
    return (!name || restaurant.name.includes(name)) &&
      (!city || restaurant.city == city) &&
      (!services?.length || checkArr(restaurant.services, services)) &&
      (!cuisines?.length || cuisines.find(cuisine => restaurant.cuisine == cuisine)) &&
      (!companies?.length || checkArr(restaurant.companies as IRestaurant.Company[], companies))
  });

  const sortedRestaurants = sortRestaurants(filteredRestaurants, sortedBy);
  console.log(sortedRestaurants);

  return sortedRestaurants;
}

const deleteRestaurant = async (restaurantId: string) => {
  return await Restaurant.findByIdAndDelete(restaurantId);
}

const updateRestaurant = async (restaurantId: string, restaurantData: IRestaurant.RestaurantData) => {
  const restaurant = await Restaurant.findById(restaurantId);
  console.log(restaurant)
  if (!restaurant) {
    throw new Error(`Restaurant with ID ${restaurantId} not found.`);
  }
  Object.assign(restaurant, restaurantData);

  return await restaurant.save();
};

const getRestaurantByRestaurantID = async (_id: string) => {


  const restaurant = await Restaurant.findById({ _id })
  return Restaurant
}
const getRestaurantsByOwnerID = async (ownerId: string) => {

  const restaurants = await Restaurant.find({ ownerId });
  return restaurants;
}

const getRestaurantByFoodID = async (ownerId: string, _id: string, FoodID: string) => {

  const restaurants = await Restaurant.findById({ ownerId, _id });
  return restaurants;
}

const updateRestaurantForFood = async (id: string, data: any) => {
  try {
    const restaurant = await Restaurant.findOneAndUpdate({ _id: id }, { ...data }, { new: true });
    return restaurant;
  } catch (error) {
    throw error;
  }
};

const getRestaurantByOwnerIDandRestaurant = async (_id: string) => {

  const restaurants = await Restaurant.find({ _id });
  return restaurants;
}


const getAllReviews = async (): Promise<IRestaurant.Review[]> => {
  const restaurants = await Restaurant.find();

  if (!restaurants.length) {
    throw new Error('Restaurant not found');
  }

  return restaurants.reduce(async (totalReviewsPromise: Promise<IRestaurant.Review[]>, restaurant) => {
    const totalReviews = await totalReviewsPromise;

    if (restaurant.reviews && restaurant.reviews.length > 0) {
      const reviewsPromises = restaurant.reviews.map(async review => {
        const user = await userController.getUser(review.userId);
        return {
          _id: review._id,
          company: review.company,
          content: review.content,
          starRating: review.starRating,
          userId: review.userId,
          restaurantId: restaurant.id,
          userName: `${user?.firstName} ${user?.lastName}`,
          restaurantName: restaurant.name,
        }
      });

      const reviews = await Promise.all(reviewsPromises);
      return [...totalReviews, ...reviews];
    }
    return totalReviews;
  }, Promise.resolve([] as IRestaurant.Review[]));
};



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

const getRestaurantByID = async (id: string) => {
  const restaurant = await Restaurant.findById(id)
  return Restaurant
}

export default { createNewRestaurant, getRestaurantByRestaurantID, getRestaurantByOwnerIDandRestaurant, getRestaurantsByOwnerID, getRestaurantByFoodID, getRestaurant, getRestaurants, deleteRestaurant, updateRestaurant, updateRestaurantForFood, getReviews, getAllReviews, addReview, deleteReview, getRestaurantByAddress, getRestaurantByID };
