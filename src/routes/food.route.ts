import express, { Express, Request, Response, json } from 'express';
import { Console, log } from 'console';
import { IRestaurant } from '../interfaces/restaurant';
import foodController from '../controllers/food.controller';
import restaurantController from '../controllers/restaurant.controller';







const route = express.Router()


route.get("/:id", async (req: express.Request, res) => {
  try {
    const foodList = await foodController.GetFood(req.params.id)
    if (!foodList || foodList.length === 0) {
      res.status(200).send("No food  exist in this type of id ").end()
    }
    else
      res.status(200).send(foodList).end()

  } catch (error) {
    res.status(404).send(error).end()
  }

})


route.get("/restaurant/:id", async (req: express.Request, res) => {
  try {
    const foodList = await foodController.GetRestaurantFood(req.params.id)
    if (!foodList || foodList.length === 0) {
      res.status(200).send("No food  exist in this type of id ").end()
    }
    else {
      console.log(`foodList: `, foodList)
      res.status(200).send(foodList)
    }

  } catch (error) {
    res.status(404).send(error)
  }

})


route.post(`/:name`, async (req: express.Request, res) => {
  const addFood = await foodController.AddFood(req.body);
  if (addFood) {
    res.status(201).send(addFood);
  } else {
    res.status(400).send({ error: "Unable to add food to this restaurant" });
  }

});


route.delete("/:restaurantID/:foodID", async (req, res) => {
  const foodID = req.params.foodID
  const restaurantID = req.params.restaurantID;
  try {
    const restaurant: any = await restaurantController.getRestaurantByOwnerIDandRestaurant(restaurantID);
    let newmenuItems = restaurant[0].menuItems; // Put menuItems in a new array
    newmenuItems = newmenuItems.filter((menuItem: { _id: string; }) => menuItem._id.toString() !== foodID.toString())
    console.log({ ...restaurant, menuItems: newmenuItems });
    const newrestaurant = await restaurantController.updateRestaurantForFood(restaurantID, { ...restaurant, menuItems: newmenuItems });
    const delrest = foodController.DeleteFood(foodID as string);
    if (!delrest)
      res.sendStatus(201).send("Succeed!");
  } catch (error) {
    res.status(404).send(error);
  }
});

route.get("/:restaurantID/:foodID", async (req, res) => {


  const foodID = req.params.foodID
  const restaurantID = req.params.restaurantID
  try {
    const restaurant: any = await restaurantController.getRestaurantByID(restaurantID)
    let newmenuItems = restaurant.menuItems
    newmenuItems = newmenuItems.filter((menuItem: { _id: string; }) => menuItem._id.toString() === foodID.toString())
    res.status(201).send(newmenuItems);

  } catch (error) {
    res.status(500).send(error);
  }
});

route.put('/:restaurantID/:foodID', async (req, res) => {
  const foodID = req.params.foodID
  const restaurantID = req.params.restaurantID
  try {
    const restaurant: any = await restaurantController.getRestaurantByID(restaurantID)
    let newmenuItems = restaurant.menuItems
    const index = newmenuItems.findIndex((menuItem: { _id: string; }) => menuItem._id.toString() === foodID.toString())
    newmenuItems[index] = req.body
    const newrestaurant = await restaurantController.updateRestaurantForFood(restaurantID, { ...restaurant, menuItems: newmenuItems });
    console.log(newrestaurant);
    res.status(201).send(newrestaurant);

  } catch (error) {
    res.status(500).send(error);
  }

})




export default route