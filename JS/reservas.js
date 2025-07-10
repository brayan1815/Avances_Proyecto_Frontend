
import { get, put } from "../api.js";
import { crearFilaTablaReservas, crearTabla, validarNumeros } from "./MODULES/modules.js";

const main=document.querySelector('.contenido__contenedor');
const barraBusqueda=document.querySelector('.buscar__input');


const reservas=await get('reservas');

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


if(reservas.length>0){
    crearTabla(['Documento','Usuario','Hora Inicio','Hora Fin','Consola'],main);

    const cuerpoTabla=document.querySelector('.tabla__cuerpo');


    for (const reserva of reservas) {
      await crearFilaTablaReservas(reserva,reserva.id,cuerpoTabla);
    }
}

const cuerrpoTabla=document.querySelector('.tabla__cuerpo');
const filasTabla=document.querySelectorAll('.tabla__fila');


const actualizarEstados = async () => {
  console.log('Actualizando estados...');

  const reservas = await get('reservas');

  for (const reserva of reservas) {
    const estado = evaluarEstadoReserva(reserva);
    if (reserva.id_estado_reserva != estado) {
      reserva.id_estado_reserva = estado;
      await put(`reservas/${reserva.id}`, reserva);
      

      for (const fila of [...filasTabla]) {
        const id_reser=fila.getAttribute('id');
        const reser=await get(`reservas/${id_reser}`);

        if(reser.id_estado_reserva==2){
          fila.classList.add('tabla__fila--verde');
        }
        else if(reser.id_estado_reserva==3){
          fila.classList.add('tabla__fila--rojo')
        }
      }
    }
  }


};

let estaBuscando = false;

const buscarReservas = async (event) => {
  if (estaBuscando) return;

  estaBuscando = true;

  const texto = event.target.value.trim();
  const regex = new RegExp("^" + texto);

  const reservas = await get('reservas');
  cuerrpoTabla.innerHTML = "";

  for (const reserva of reservas) {
    const usu = await get(`usuarios/${reserva.id_usuario}`);
    const documento = String(usu.documento);

    if (texto === "" || regex.test(documento)) {
      crearFilaTablaReservas(reserva, reserva.id, cuerrpoTabla);
    }
  }

  estaBuscando = false; // libera la ejecución
};



actualizarEstados();

setInterval(() => {
    actualizarEstados();
}, 60000); 

let aux=false;

barraBusqueda.addEventListener('input', buscarReservas);
barraBusqueda.addEventListener('keydown', validarNumeros);

window.addEventListener('click',(event)=>{
  const clase=event.target.getAttribute('class');
  const id=event.target.getAttribute('id');

  if(clase=='registro__boton Info'){
    window.location.href=`info_reserva.html?id=${encodeURIComponent(id)}`
  }
  
})