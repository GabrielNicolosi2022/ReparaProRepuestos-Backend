import { Router } from "express";
import refrigeratorRouter from "./refrigerator.routes.js";

const indexRouter = Router();

indexRouter.use("/", refrigeratorRouter);

export default indexRouter;
