import { get, put } from "../api.js";
import { crearFila, crearFilaTablaReservas, crearTabla } from "./MODULES/modules.js";


// const nombreUsuario=document.querySelector('.encabezadoPerfil__nombre');
const main=document.querySelector('.contenido__contenedor');

// const params = new URLSearchParams(window.location.search);
// const id = params.get("id");

// const usuario=await get(`usuarios/${id}`);

// nombreUsuario.textContent=usuario.nombre;

const reservas=await get('reservas');

console.log(reservas);

const evaluarEstadoReserva = (reserva) => {
  const ahora = new Date();
  const inicio = new Date(reserva.hora_inicio);
  const fin = new Date(reserva.hora_finalizacion);
  

  if (ahora < inicio) {
    return 1;
  } else if (ahora >= inicio && ahora <= fin) {
    return 2;
  } else {
    return 3;
  }
};

const recargarTabla = (reservas, contenedor) => {
  contenedor.innerHTML = "";
  crearTabla(['Documento', 'Usuario', 'Hora Inicio', 'Hora Fin', 'Consola'], main);

  const cuerpoTabla = document.querySelector('.tabla__cuerpo');

  reservas.forEach(reserva => {
    crearFilaTablaReservas(reserva, reserva.id, cuerpoTabla);
  });
};

if(reservas.length>0){
    crearTabla(['Documento','Usuario','Hora Inicio','Hora Fin','Consola'],main);

    const cuerpoTabla=document.querySelector('.tabla__cuerpo');

    reservas.forEach(reserva => {
        crearFilaTablaReservas(reserva,reserva.id,cuerpoTabla);
    });


}

const actualizarEstados = async () => {
  console.log('Actualizando estados...');

  const reservas = await get('reservas');

  for (const reserva of reservas) {
    const estado = evaluarEstadoReserva(reserva);
    

    if (reserva.id_estado_reserva != estado) {
      reserva.id_estado_reserva = estado;
      await put(`reservas/${reserva.id}`, reserva);
    }
  }

  recargarTabla(reservas, main); // recarga tabla con las reservas actualizadas
};

actualizarEstados();

setInterval(() => {
    actualizarEstados();
}, 60000); 
