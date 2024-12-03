export const sortedProds = (sort) => {
  const sortOptions = {};

  if (sort) {
    if (sort === "asc") {
      sortOptions.modelo = 1;
    } else if (sort === "desc") {
      sortOptions.modelo = -1;
    }
  }

  return sortOptions;
};
