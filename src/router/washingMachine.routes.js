import { Router } from "express";
import * as washingControllers from "../controllers/washingMachine.controller.js";
import { uploader } from "../middlewares/multer.middlewares.js";

const washingMachineRouter = Router();

// Obtener todos los equipos paginados, filtrados y ordenados
washingMachineRouter.get("/", washingControllers.getAllProducts);

// Crear un nuevo equipo
washingMachineRouter.post(
  "/",
  uploader.array("thumbnails"),
  washingControllers.createProduct
);

// Obtener un equipo por id
washingMachineRouter.get("/:pid", washingControllers.getProductById);

// Modificar un equipo
washingMachineRouter.patch("/:pid", washingControllers.updateProduct);

// Eliminar un equipo (acceso restringido, sólo Admin) //TODO: crear middleware
washingMachineRouter.delete("/:pid", washingControllers.deleteProduct);

export default washingMachineRouter;
