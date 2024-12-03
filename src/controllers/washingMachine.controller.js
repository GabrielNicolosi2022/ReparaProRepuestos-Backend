import getLogger from "../utils/log.utils.js";
import * as washingService from "../services/washingMachine.services.js";
import { sortedProds } from "../helpers/sort.helpers.js";
import { filteredProds } from "../helpers/filter.helpers.js";

const log = getLogger();

// traer todos los productos paginados
const getAllProducts = async (req, res) => {
  try {
    // obterner los querys params
    const limit = parseInt(req.params.limit) || 10; // cant de productos por página
    const page = parseInt(req.params.page) || 1; // numero de página
    const sort = req.query.sort; // ordena los productos alfabeticamente
    const query = req.query; // permite ordenarlos por categoria, marca, tipo, etc.

    // ordenar los productos si se proporciona un sort
    const sortOptions = sortedProds(sort);

    // filtrar los productos si se proporciona query
    const filter = filteredProds(query);

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
    } = await washingService.getAllProdPaginated(options, filter, sortOptions);

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

export { getAllProducts };
