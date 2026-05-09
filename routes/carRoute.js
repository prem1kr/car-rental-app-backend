import express from 'express';
import { AddCar, EditCar, getCar, RemoveCar } from '../controllers/carController';

const carRouter = express.Router();

carRouter.post('/add-car', AddCar);
carRouter.put('/edit-car/:id', EditCar);
carRouter.delete('/delete-car/:id', RemoveCar);
carRouter.get('/get-car', getCar);

export default carRouter;