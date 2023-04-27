import express, { Express, Request, Response } from 'express';
import Controller from '../Controller/restaurant';
import { Console } from 'console';




const route = express.Router()


route.get("/Restaurant-Form", (req, res) => {


})

route.post("/Restaurant-Form", (req: express.Request, res) => {


    const AddRes = Controller.AddRestaurant(req.body)

    res.status(201).send(AddRes)

})

route.post("/Food-Form", (req, res) => {



})

export default route