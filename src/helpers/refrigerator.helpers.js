export const validateproductFormat = (data) => {
  // Verificar que se proporcione un formato de producto válido y que éste no sea enviado vacío
  if (!(typeof data === "object" && Object.keys(data).length > 0)) {
  }
  // si no tiene errores
  return null;
};

export const validateProductFields = (data) => {
  const { repuestos } = data;
  // si no está completo el campo refrigerante
  if (
    repuestos &&
    (!repuestos.refrigerante ||
      !repuestos.refrigerante.tipo ||
      !repuestos.refrigerante.cant)
  ) {
    return "Bad Request: El campo refrigerante es obligatorio y debe tener tipo y cantidad";
  }
  // si no está completo el campo motor
  if (
    repuestos &&
    (!repuestos.motor || !repuestos.motor.marca || !repuestos.motor.modelo)
  ) {
    return "Bad Request: El campo motor es obligatorio y debe tener marca y modelo";
  }
  // si no tiene errores
  return null;
};
