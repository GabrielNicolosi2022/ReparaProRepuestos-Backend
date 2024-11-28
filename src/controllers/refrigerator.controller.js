import getLogger from "../utils/log.utils.js";
import * as refrigService from "../services/refrigerator.services.js";
import { formatProductData } from "../DTO/refrigerator.dto.js";
import {
  validateproductFormat,
  validateProductFields,
} from "../helpers/refrigerator.helpers.js";

const log = getLogger();

// traer todos los productos paginados
const getAllProducts = async (req, res) => {
  try {
    // obterner los querys params
    const limit = parseInt(req.query.limit) || 10; // cant de productos por página
    const page = parseInt(req.query.page) || 1; // numero de página
    const sort = req.query.sort; // ordena los productos alfabeticamente
    const query = req.query; // permite ordenarlos por categoria, marca, tipo, etc.

    // ordenar los productos si se proporciona un sort
    const sortOptions = {};

    if (sort) {
      if (sort === "asc") {
        sortOptions.name = 1;
      } else if (sort === "desc") {
        sortOptions.name = -1;
      }
    }

    // filtrar los productos si se proporciona query
    const filter = {};

    if (query) {
      if (query.marca) {
        filter.$or = [{ marca: query.marca }];
      }
      if (query.modelo) {
        filter.$or = [{ marca: query.modelo }];
      }
      if (query.sistema) {
        filter.$or = [{ sistema: query.sistema }];
      }
      if (query.tecnologia) {
        filter.$or = [{ tecnologia: query.tecnologia }];
      }
    }

    // opciones de paginación
    const options = {
      limit: limit,
      page: page,
    };

    const {
      docs,
      totalPages,
      prevPage,
      nextPage,
      actualPage,
      hasPrevPage,
      hasNextPage,
    } = await refrigService.getAllProdPaginated(options, filter, sortOptions);

    // enlaces a página previa y siguiente
    const prevLink = hasPrevPage
      ? `/products?page=${prevPage}&limit=${limit}`
      : null;
    const nextLink = hasNextPage
      ? `/products?page=${nextPage}&limit=${limit}`
      : null;

    // objeto para respuesta
    const response = {
      status: "success",
      payload: docs,
      totalPages: totalPages,
      prevPage: prevPage,
      nextPage: nextPage,
      page: actualPage,
      hasPrevPage: hasPrevPage,
      hasNextPage: hasNextPage,
      prevLink: prevLink,
      nextLink: nextLink,
    };

    res.status(200).json({
      status: "success",
      message: "Productos encontrados",
      data: response,
    });
  } catch (error) {
    log.fatal("Error al obtener los productos." + error.message);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

/**
 * getProductById - Obtiene un producto a partir de su id
 * @param {pid} req
 * @param {payload} res
 * @returns {product}
 */
const getProductById = async (req, res) => {
  // Obtengo el valor del parámetro de ruta 'pid'
  const id = req.params.pid;

  try {
    const product = await refrigService.getProductById(id);

    if (!product) {
      log.error(`Producto con id ${id} no encontrado`);
      return res.status(400).json({
        status: "error",
        message: "Product not found for bad request",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Producto encontrado",
      payload: product,
    });
  } catch (error) {
    log.fatal("Error al obtener el producto. " + error.message);
    res.status(500).json({ status: error, message: "Internal Server Error" });
  }
};

/**
 * createProducts - Crea un producto
 * @param {body} req
 * @param {Product} res
 * @returns {newProduct}
 */

const createProduct = async (req, res) => {
  const data = req.body;
  //   log.debug("Controller - Data: ", data);
  try {
    // Verificar que se proporcione un formato de producto válido y que éste no sea enviado vacío
    const validatedData = validateproductFormat(data);
    if (validatedData) {
      log.error(validatedData);
      return res.status(400).json({ status: "Error", message: validatedData });
    }

    // validar campos obligatorios
    const {
      marca,
      modelo,
      fabricante,
      tecnologia,
      aplicacion,
      sistema,
      dimensiones,
      funcionalidad,
      puertas,
      distribucion,
      volumen,
      repuestos,
      thumbnails,
    } = data;

    if (!marca || !modelo || !tecnologia || !aplicacion || !sistema) {
      log.error(
        "Error intentando crear el Producto, verificar campos obligatorios"
      );
      return res.status(400).json({
        status: "Error",
        message: "Bad Request",
      });
    }

    // validaciones adicionales
    const validationError = validateProductFields(data);
    if (validationError) {
      log.error(validationError);
      return res
        .status(400)
        .json({ status: "Error", message: validationError });
    }

    // crear el producto
    const newProduct = formatProductData(data);

    // Validar que el producto no exista ya en la base de datos
    const existingProduct = await refrigService.findProductByBrandAndModel({
      marca,
      modelo,
    });
    if (existingProduct) {
      log.error("El producto ya existe en la base de datos");
      return res.status(409).json({
        status: "Error",
        message: "Conflict: El producto ya existe",
      });
    }

    // guardar el producto usando el servicio
    const createdProduct = await refrigService.createProduct(newProduct);

    res.status(201).json({
      status: "success",
      message: "Producto creado correctamente",
      payload: createdProduct,
    });
  } catch (error) {
    log.fatal(`Error al guardar el producto: ${error.message}`, { error });
    return res
      .status(500)
      .json({ status: error, message: "Internal Server Error" });
  }
};

//TODO:   deleteProduct,
/** updateProduct - Modifica un producto existente
 * @param {id} req
 * @param {data} req
 * @param {updatedProduct} res
 * @returns {updatedProduct}
 * */
const updateProduct = async (req, res) => {
  const id = req.params.pid;
  const data = req.body;

  try {
    // Verificar que se proporcione un formato de producto válido y que éste no sea enviado vacío
    const validatedData = validateproductFormat(data);
    if (validatedData) {
      log.error(validatedData);
      return res.status(400).json({ status: "Error", message: validatedData });
    }

    // enviar la data
    const updatedProduct = await refrigService.updateProductById(id, data);

    res.status(201).json({
      status: "success",
      message: "Producto actualizado correctamente",
      payload: updatedProduct,
    });
  } catch (error) {
    log.fatal("Error al actualizar el producto. " + error.message);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.pid;

  try {
    const prodToDelete = await refrigService.getProductById(id);
    if (!prodToDelete) {
      log.error("Producto no encontado");
      return res
        .status(404)
        .json({ status: "Error", message: "Product not found" });
    }

    await refrigService.deleteProduct(id);
    return res.status(200).json({
      status: "success",
      message: "El recurso ha sido eliminado correcatamente",
    });
  } catch (error) {
    log.fatal("Error al eliminar el producto. " + error.message);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
