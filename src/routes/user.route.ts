import { Router } from "express";
import userController from "../controllers/user.controller";

const router = Router()

router.post(`/auth`, async (req, res) => {
  try {
    console.log(`POST /auth: `, req.body);
    const result = await userController.authUser(req.body);
    if (result) {
      res.status(200).send(result);
    } else {
      res.sendStatus(401)
    }
  } catch (e: any) {
    res.sendStatus(401);
  }
})

router.post('/', async (req, res) => {
  try {
    console.log(`POST /user`)
    const result = await userController.createNewUser(req.body);
    res.status(200).send(result);
  } catch (e: any) {
    const errMsg = `An error occurred while creating a new restaurant`;
    console.log(`${errMsg}: `, e);
    res.status(400).send(errMsg);
  }
})

router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await userController.updateUser(userId, req.body);
    res.status(200).send(result);
  } catch (e: any) {
    const errMsg = `An error occurred while updating an existing restaurant`;
    console.log(`${errMsg}: `, e);
    res.status(400).send(errMsg);
  }
})

router.get(`/:userId`, async (req, res) => {
  const { userId } = req.params;
  const result = await userController.getUser(userId);
  res.status(result != null ? 200 : 404).send(result);
})

router.delete(`/:userId`, async (req, res) => {
  const { userId } = req.params;
  const result = await userController.deleteUser(userId);

  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send('Restaurant not found');
  }
})


export default router;