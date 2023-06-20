import { Router } from "express";
import userController from "../controllers/user.controller";
import { jwtParser } from './../middlewares/jwt-parser';
import { authorized } from "../middlewares/authentication";
import { IUser } from "../interfaces/user";
import jwt from 'jsonwebtoken';

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
    console.log(e);
    res.sendStatus(401);
  }
})

router.post('/', async (req, res) => {
  try {
    console.log(`POST /user`);
    const result = await userController.createNewUser(req.body);
    res.status(200).send(result);
  } catch (e: any) {
    const errMsg = `An error occurred while creating a new user`;
    console.log(`${errMsg}: `, e);
    res.status(400).send(errMsg);
  }
})

router.put('/:userId', async (req, res) => {
  console.log(`PUT /`)
  try {
    const { userId } = req.params;
    const result = await userController.updateUser(userId, req.body as IUser.UserData);
    console.log(`result: `, result);
    res.status(200).send(result);
  } catch (e: any) {
    const errMsg = `An error occurred while updating an existing user`;
    console.log(`${errMsg}: `, e);
    res.status(400).send(errMsg);
  }
})

router.get(`/`, async (req, res) => {
  console.log(`GET /`)
  const result = await userController.getAllUsers();
  res.status(result != null ? 200 : 404).send(result);
})

router.get(`/:userId`, async (req, res) => {
  console.log(`GET /:userId`)
  const { userId } = req.params;
  const result = await userController.getUser(userId);
  res.status(result != null ? 200 : 404).send(result);
});

router.get(`/`, jwtParser, authorized, async (req, res) => {
  const user = res.locals.user._doc;

  return res.status(200).send({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  });
})

router.delete(`/`, async (req, res) => { // fix this later
  const token = req.headers.authorization as string;
  const userId: string | null = await new Promise(resolve => {
    jwt.verify(token, `my_key`, async (err, decoded: any) => {
      if (err) resolve(null);
      resolve(decoded.id);
    });
  });
  console.log(`userId: `, userId);
  if (userId) {
    const result = await userController.deleteUser(userId);
    res.status(200).send(result);
    // if (result) {
    // } else {
    //   res.status(200).send('An error occurred while deleting the user');
    // }
  } else {
    res.status(200).send('User not found');
  }
})

router.delete(`/:userId`, async (req, res) => {
  const { userId } = req.params;
  const result = await userController.deleteUser(userId);

  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send('User not found');
  }
})


export default router;