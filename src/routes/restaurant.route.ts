import { Router } from "express";
import restaurantController from "../controllers/restaurant.controller";

const router = Router()


router.post('/', async (req, res) => {
  try {
    console.log(`POST /restaurant`)
    const result = await restaurantController.createNewRestaurant(req.body);
    res.status(200).send(result);
  } catch (e: any) {
    const errMsg = `An error occurred while creating a new restaurant`;
    console.log(`${errMsg}: `, e);
    res.status(400).send(errMsg);
  }
})
router.get(`/:address`, async (req, res) => {

  console.log(`GET /restaurant`)
  const address = req.body.address;
  console.log(address);
  const result = await restaurantController.getRestaurantByAddress(address);
  console.log(result);
  if(result != null){
    res.status(200).send(result);
  }else{
    res.status(404).send("ffffff")
  }
  
})


router.put('/:restaurantId', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const result = await restaurantController.updateRestaurant(restaurantId, req.body);
    res.status(200).send(result);
  } catch (e: any) {
    const errMsg = `An error occurred while updating an existing restaurant`;
    console.log(`${errMsg}: `, e);
    res.status(400).send(errMsg);
  }
})

router.get(`/:restaurantId`, async (req, res) => {
  const { restaurantId } = req.params;
  const result = await restaurantController.getRestaurant(restaurantId);
  res.status(result != null ? 200 : 404).send(result);
})

router.delete(`/:restaurantId`, async (req, res) => {
  const { restaurantId } = req.params;
  const result = await restaurantController.deleteRestaurat(restaurantId);

  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send('Restaurant not found');
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

export default router;