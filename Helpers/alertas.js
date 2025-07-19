export const confirmar = (mensaje) => {
  return Swal.fire({
    title: "Precaución",
    text: `¿Está seguro de ${mensaje}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí"
  });
}

export const success = (data) => {
  return Swal.fire({
    title: data.mensaje,
    icon: "success",
    draggable: true
  });
}