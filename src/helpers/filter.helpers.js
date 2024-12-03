export const filteredProds = (query) => {
  const filter = {};

  if (query) {
    filter.$and = [];

    if (query.marca) {
      filter.$and.push({ marca: query.marca });
    }
    if (query.modelo) {
      filter.$and.push({ modelo: query.modelo });
    }
    if (query.sistema) {
      filter.$and.push({ sistema: query.sistema });
    }
    if (query.tecnologia) {
      filter.$and.push({ tecnologia: query.tecnologia });
    }
  }

  return filter;
};
