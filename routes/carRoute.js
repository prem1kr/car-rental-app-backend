import express from 'express';
import {AddCar,EditCar,RemoveCar} from '../controllers/carController.js';

const carRouter = express.Router();

carRouter.post('/add-car', Addcar);
carRouter.put('/edit-car/:id', EditCar);
carRouter.delete('/delete-car/:id', RemoveCar);

export default carRouter;