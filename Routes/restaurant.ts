import express, { Express, Request, Response } from 'express';
import Controller from '../Controller/restaurant';
import { Console } from 'console';
import { IRestaurant } from '../Types/Data-Types/resturante';


const fs = require('fs');
const path = require('path');

const route = express.Router()


route.get("/Restaurant-Form", async (req, res) => {
    try {
        const ResturanteList = await Controller.GetRestaurant()

        if (ResturanteList)
            res.status(200).send(ResturanteList).end()
        else
            res.status(404).send("some ERRor shown!").end()

    } catch (error) {
        res.status(404).send(error).end()

    }

})

route.post("/Restaurant-Form", (req: express.Request, res) => {

    try {
        const AddRes = Controller.AddRestaurant(req.body)

        if (AddRes)
            res.status(201).send(AddRes)
        else
            res.status(201).send([])

    } catch (error) {
        res.status(404).send(error);
    }

})

route.delete("/Restaurant-Form/:id", (req, res) => {

    const id = req.params.id;
    console.log(id);

    try {
        const delrest = Controller.DeleteRestaurant(id);
        if (!delrest)
            res.status(201).send("Succeed!");
    } catch (error) {
        res.status(404).send(error);
    }



})


route.put("/Restaurant-Form/:id", async (req, res) => {
    try {
        if (req.is("application/json")) {
            const newinfo = await Controller.UpdateRestaurant(req.params.id, req.body);
            res.status(201).send(newinfo);
        } else {
            res.status(415).send("Unsupported Media Type");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

route.post('/upload', function (req:IRestaurant.RestaurantRequest, res) {
    const imageDataUrl = req.body.images;
    const base64Data = imageDataUrl.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const filePath = path.join(__dirname, 'C:\Users\anjja\Desktop\images.jpg', 'myimage.jpg');

    fs.writeFile(filePath, buffer, function (err: any) {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});


export default route