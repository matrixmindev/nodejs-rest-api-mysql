import { Router } from "express";
import { getIndex } from "../controllers/index.controllers.js";

export const indexRouter = Router()

indexRouter.get('/ping', getIndex)