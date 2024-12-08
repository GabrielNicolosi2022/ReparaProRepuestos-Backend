export const validateProductFields = (data) => {
  const { repuestos } = data;

  if (repuestos && !repuestos.motor) {
    return "Bad Request: El campo 'motor' es obligatorio";
  }
  // si no tiene errores
  return null;
};
