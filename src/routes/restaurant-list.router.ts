import { Router } from "express";
import restaurantController from "../controllers/restaurant-list.controller";

const router = Router()
router.get('/', async (req, res) => {
  try {
    console.log(`POST /restaurant/`)
    const result = await restaurantController.getAllRestaurant();
    res.status(200).send(result);
  } catch (e: any) {
    const errMsg = `An error occurred while getting reviews from `;
    console.log(`${errMsg}: `, e);
    res.status(400).send(errMsg);
  }
})
export default router;