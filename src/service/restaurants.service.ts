import { IRestaurant } from "../interfaces/restaurant";

const calculateAvgStars = (restaurant: IRestaurant.RestaurantData) => {
  const reviews = restaurant.reviews;
  if (!reviews || !reviews.length) return 0;
  const totalReviews = reviews.reduce((accumulator, currentReview) => {
    return accumulator + currentReview.starRating
  }, 0);
  console.log({ totalReviews, length: reviews.length })
  return totalReviews / reviews.length;
}

const sortRestaurants = (restaurants: IRestaurant.RestaurantData[], sortedBy: IRestaurant.SortedBy): IRestaurant.RestaurantData[] => {
  switch (sortedBy) {
    case IRestaurant.SortedBy.MOST_SERVICES:
      return restaurants.sort((a, b) => b.services.length - a.services.length);
    case IRestaurant.SortedBy.CLOSEST_DISTANCE:
    // return restaurants;
    case IRestaurant.SortedBy.LOWEST_RATED:
      return restaurants.sort((a, b) => {
        const aAverageRating = calculateAvgStars(a);
        const bAverageRating = calculateAvgStars(b);
        return aAverageRating - bAverageRating;
      });
    case IRestaurant.SortedBy.HIGHEST_RATED:
      return restaurants.sort((a, b) => {
        const aAverageRating = calculateAvgStars(a);
        const bAverageRating = calculateAvgStars(b);
        return bAverageRating - aAverageRating;
      });
    case IRestaurant.SortedBy.BEST_MATCH:
      return restaurants;
    default:
      return restaurants;
  }
}

export { sortRestaurants }