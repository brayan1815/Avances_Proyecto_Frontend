
import { get, put } from "../api.js";
import { crearFilaTablaReservas, crearTabla, validarNumeros } from "./MODULES/modules.js";

const main=document.querySelector('.contenido__contenedor');
const barraBusqueda=document.querySelector('.buscar__input');


const reservas=await get('reservas/detalle');

const evaluarEstadoReserva = (hora_inicio,hora_fin) => {
  const ahora = new Date();
  

  if (ahora < hora_inicio) {
    return 1;
  } else if (ahora >= hora_inicio && ahora <= hora_fin) {
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


const actualizarEstados=async()=>{
   console.log("ejecutando");
  const reservas=await get('reservas');

  const horaActual=new Date();

  for (const reserva of reservas) {
    const inicio = new Date(reserva.hora_inicio);
    const fin = new Date(reserva.hora_finalizacion);

    const estado=evaluarEstadoReserva(inicio,fin)

    if(estado!=reserva.id_estado_reserva){
      reserva['id_estado_reserva']=estado;
      await put(`reservas/${reserva.id}`,reserva);
    }
  }

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

  const minutosActuales=horaActual.getMinutes();
  let volvEje=0;
  if(minutosActuales<30){
    volvEje=30-minutosActuales;
  }
  else{
    volvEje=60-minutosActuales;
  }
  console.log(volvEje);
  
  setTimeout(actualizarEstados,(volvEje*60000));
}
actualizarEstados();

let estaBuscando = false;

const buscarReservas = async (event) => {
  if (estaBuscando) return;

  estaBuscando = true;

  const texto = event.target.value.trim();
  const regex = new RegExp("^" + texto);

  const reservas = await get('reservas/detalle');
  cuerrpoTabla.innerHTML = "";

  for (const reserva of reservas) {
    const usu = await get(`usuarios/documento/${reserva.documentoUsuario}`);
    const documento = String(usu.documento);

    if (texto === "" || regex.test(documento)) {
      crearFilaTablaReservas(reserva, reserva.id, cuerrpoTabla);
    }
  }

  estaBuscando = false;
};


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