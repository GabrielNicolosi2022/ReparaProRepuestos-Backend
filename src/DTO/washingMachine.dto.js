export const formatProductData = (data) => ({
  marca: data.marca,
  modelo: data.modelo,
  fabricante: data.fabricante,
  tecnologia: data.tecnologia,
  carga_tipo: data.carga_tipo,
  eje: data.eje,
  capacidad: data.capacidad,
  rpm_centrif: data.rpm_centrif,
  repuestos: data.repuestos,
  thumbnails: data.thumbnails || [],
});
