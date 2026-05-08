import express from 'express';
import {AddCar,EditCar,RemoveCar} from '../controllers/carController.js';

const cartRouter = express.Router();

cartRouter.post('/add-car', Addcar);
cartRouter.put('/edit-car/:id', EditCar);
cartRouter.delete('/delete-car/:id', RemoveCar);

export default cartRouter;