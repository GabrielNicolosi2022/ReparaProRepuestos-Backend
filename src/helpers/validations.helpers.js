export const validateproductFormat = (data) => {
  // Verificar que se proporcione un formato de producto válido y que éste no sea enviado vacío
  if (!(typeof data === "object" && Object.keys(data).length > 0)) {
    return "Bad Request: El formato de producto enviado es inválido.";
  }
  // si no tiene errores
  return null;
};
