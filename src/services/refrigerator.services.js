import Refrigerator from "../models/refrigerator.model.js";

const getAllProdPaginated = async (options, filter, sortOptions) => {
  const {
    docs,
    totalPages,
    prevPage,
    nextPage,
    page,
    hasPrevPage,
    hasNextPage,
  } = await Refrigerator.paginate(filter, { ...options, sortOptions });

  return {
    docs,
    totalPages,
    prevPage,
    nextPage,
    page,
    hasPrevPage,
    hasNextPage,
  };
};

const getProductById = async (id) =>
  await Refrigerator.findById({ _id: id }).exec();

const createProduct = async (data) => await Refrigerator.create(data);

const updateProductById = async (id, data) =>
  await Refrigerator.findByIdAndUpdate(
    { _id: id },
    { $set: data },
    { new: true }
  );

const deleteProduct = async (id) => await Refrigerator.deleteOne({ _id: id });

const findProductByBrandAndModel = async (data) =>
  await Refrigerator.findOne({ marca: data.marca, modelo: data.modelo });

export {
  getAllProdPaginated,
  getProductById,
  createProduct,
  updateProductById,
  deleteProduct,
  findProductByBrandAndModel,
};
