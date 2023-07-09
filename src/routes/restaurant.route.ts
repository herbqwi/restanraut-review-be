import { Router } from "express";
import restaurantController from "../controllers/restaurant.controller";
import { IRestaurant } from "../interfaces/restaurant";

const router = Router()


router.post('/', async (req, res) => {
  try {
    console.log(`POST /restaurant`)
    const { address, city, description, images, ownerId, name, phoneNumber, location, cuisine, services }: IRestaurant.RestaurantData = req.body
    const result = await restaurantController.createNewRestaurant({
      address, city, description, images, ownerId, name, phoneNumber, location, cuisine, services,
    } as any);
    res.status(200).send(result);
  } catch (e: any) {
    const errMsg = `An error occurred while creating a new restaurant`;
    console.log(`${errMsg}: `, e);
    res.status(400).send(errMsg);
  }
})
// router.get(`/:address`, async (req, res) => {

//   console.log(`GET /restaurant`)
//   const address = req.body.address;
//   console.log(address);
//   const result = await restaurantController.getRestaurantByAddress(address);
//   console.log(result);
//   if (result != null) {
//     res.status(200).send(result);
//   } else {
//     res.status(404).send("ffffff")
//   }

// })

router.get(`/reviews`, async (req, res) => {
  try {
    console.log(`POST /restaurant/reviews/`)
    const result = await restaurantController.getAllReviews();
    res.status(200).send(result);
  } catch (e: any) {
    const errMsg = `An error occurred while getting all reviews`;
    console.log(`${errMsg}: `, e);
    res.status(400).send(errMsg);
  }
})

router.get('/reviews/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;
  try {
    console.log(`POST /restaurant/reviews/:restaurantId`)
    const result = await restaurantController.getReviews(restaurantId);
    res.status(200).send(result);
  } catch (e: any) {
    const errMsg = `An error occurred while getting reviews from ${restaurantId}`;
    console.log(`${errMsg}: `, e);
    res.status(400).send(errMsg);
  }
})

router.post('/review/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;
  try {
    console.log(`POST /restaurant/review/${restaurantId}`)
    const result = await restaurantController.addReview(restaurantId, req.body);
    res.status(200).send(result);
  } catch (e: any) {
    const errMsg = `An error occurred while adding a new review to ${restaurantId}`;
    console.log(`${errMsg}: `, e);
    res.status(400).send(errMsg);
  }
})

router.delete('/review/:restaurantId/:reviewId', async (req, res) => {
  const { restaurantId, reviewId } = req.params;
  try {
    console.log(`DELETE /restaurant/review/${restaurantId}/${reviewId}`)
    const result = await restaurantController.deleteReview(restaurantId, reviewId);
    res.status(200).send(result);
  } catch (e: any) {
    const errMsg = `An error occurred while deleting a review from ${restaurantId}`;
    console.log(`${errMsg}: `, e);
    res.status(400).send(errMsg);
  }
})

router.get(`/`, async (req, res) => {
  console.log(req.query);
  let { name, services, cuisines, companies, city, sortedBy } = req.query
  const parsedName = name as string;

  const ensureArray = (value: string | string[] | null) => value ? Array.isArray(value) ? value : [value] : [];

  const parsedServices = ensureArray(services as string[]).map(item => item ? parseInt(item) : null) as IRestaurant.Service[];
  const parsedCuisines = ensureArray(cuisines as string[]).map(item => item ? parseInt(item) : null) as IRestaurant.Cuisine[];
  const parsedCompanies = ensureArray(companies as string[]).map(item => item ? parseInt(item) : null) as IRestaurant.Company[];
  const parsedCity = Number(city ?? `0`) as IRestaurant.City;
  const parsedSortedBy = Number(sortedBy ?? `0`) as IRestaurant.SortedBy;

  console.log({ parsedServices, parsedCuisines, parsedCompanies, parsedCity, parsedSortedBy })

  const result = await restaurantController.getRestaurants({ name: parsedName, services: parsedServices, cuisines: parsedCuisines, companies: parsedCompanies, city: parsedCity, sortedBy: parsedSortedBy });
  res.status(result != null ? 200 : 404).send(result);
})

router.put('/:restaurantId', async (req, res) => {
  console.log(`PUT /`)
  try {
    const { restaurantId } = req.params;
    const result = await restaurantController.updateRestaurant(restaurantId, req.body as IRestaurant.RestaurantData);
    console.log(`result: `, result);
    res.status(200).send(result);
  } catch (e: any) {
    const errMsg = `An error occurred while updating an existing user`;
    console.log(`${errMsg}: `, e);
    res.status(400).send(errMsg);
  }
})


router.get(`/:restaurantId`, async (req, res) => {
  const { restaurantId } = req.params;
  console.log(`restuarnatId: `, restaurantId);
  const result = await restaurantController.getRestaurant(restaurantId);
  console.log(`result: `, result);
  res.status(result != null ? 200 : 404).send(result);
})

router.get(`/owner/:ownerId`, async (req, res) => {
  const { ownerId } = req.params;
  console.log(`ownerId: `, ownerId);
  const result = await restaurantController.getRestaurantsByOwnerID(ownerId);
  console.log(`result: `, result);
  res.status(result != null ? 200 : 404).send(result);
})

router.delete(`/:restaurantId`, async (req, res) => {
  const { restaurantId } = req.params;
  const result = await restaurantController.deleteRestaurant(restaurantId);

  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send('Restaurant not found');
  }
})

export default router;