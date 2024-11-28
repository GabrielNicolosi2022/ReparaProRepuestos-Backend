import WashingMachine from "../models/washingMachine.model.js";

const getAllProdPaginated = async (options, filter, sortOptions) => {
  const {
    docs,
    totalPages,
    prevPage,
    nextPage,
    page,
    hasPrevPage,
    hasNextPage,
  } = await WashingMachine.paginate(filter, { ...options, sortOptions });

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
  await WashingMachine.findById({ _id: id }).exec();

const createProduct = async (data) => await WashingMachine.create(data).exec();

const updateProductById = async (id, data) =>
  await WashingMachine.findByIdAndUpdate(
    { _id: id },
    { $set: data },
    { new: true }
  );

const deleteProduct = async (id) => await WashingMachine.deleteOne({ _id: id });

export {
  getAllProdPaginated,
  getProductById,
  createProduct,
  updateProductById,
  deleteProduct,
};
