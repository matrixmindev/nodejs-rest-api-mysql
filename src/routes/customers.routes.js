import { Router } from "express";
import {CustomerController
} from "../controllers/customer.controllers.js";
export const customersRouter = Router();


customersRouter.get("/", CustomerController.getCustomers);
customersRouter.get("/:id", CustomerController.getCustomer);
customersRouter.post("/", CustomerController.createCustomer);
customersRouter.patch("/:id", CustomerController.updateCustomer);
customersRouter.delete("/:id", CustomerController.deleteCustomer);
