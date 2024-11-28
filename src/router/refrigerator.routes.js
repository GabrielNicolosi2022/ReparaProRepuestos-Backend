import { Router } from "express";
import * as refrigControllers from "../controllers/refrigerator.controller.js";
import { uploader } from "../middlewares/multer.middlewares.js";

const refrigeratorRouter = Router();

// Obtener todos los equipos paginados, filtrados y ordenados
refrigeratorRouter.get("/", refrigControllers.getAllProducts);

// Crear un nuevo equipo
refrigeratorRouter.post(
  "/",
  uploader.array("thumbnails"),
  refrigControllers.createProduct
);

// Obtener un equipo por id
refrigeratorRouter.get("/:pid", refrigControllers.getProductById);

// Modificar un equipo
refrigeratorRouter.patch("/:pid", refrigControllers.updateProduct);

// Eliminar un equipo (acceso restringido, sólo Admin) //TODO: crear middleware
refrigeratorRouter.delete("/:pid", refrigControllers.deleteProduct);

export default refrigeratorRouter;
