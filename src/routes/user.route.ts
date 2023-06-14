import { Router } from "express";
import userController from "../controllers/user.controller";
import { jwtParser } from './../middlewares/jwt-parser';
import { authorized } from "../middlewares/authentication";

const router = Router()

router.post(`/auth`, async (req, res) => {
  try {
    const { credentials, token } = req.body;
    const result = await userController.authUser({ credentials, token });
    console.log(`result: `, result);
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

router.put('/update', jwtParser, authorized, async (req, res) => {
  try {
    console.log(`update /user`);
    const user = res.locals.user._doc;

    if(req.body.password === '') {
      delete req.body.password;
    } else {
      // bycrypt new password.
    }

    const result = await userController.updateUser(user._id, req.body);
    res.status(200).send(result);
  } catch (e: any) {
    const errMsg = `An error occurred while updating an existing user`;
    console.log(`${errMsg}: `, e);
    res.status(400).send(errMsg);
  }
})

router.get(`/:userId`, async (req, res) => {
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