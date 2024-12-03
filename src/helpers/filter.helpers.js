export const filteredProds = (query) => {
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

  return filter;
};
