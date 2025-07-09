import { get } from "../api.js";
import { cargarCardsConsolasReservar, contarCamposFormulario, formatearFecha, validar } from "./MODULES/modules.js";

const contenedor=document.querySelector('.cards--consolas');
const calendariOculto=document.querySelector('.calendariOculto');
const fondoOscuro=document.querySelector('.fondoOscuro');
const contenedorformularioNuevaReserva=document.querySelector('.contenedorFormularioModal');
const formHoraInicio=document.querySelector('#hora_inicio');
const formHoraFinalizacion=document.querySelector('#hora_finalizacion');
const formulario=document.querySelector('form');
const campoIdConsola=document.querySelector('#id_consola');
const botonCancel=document.querySelector('.formulario__boton--cancelar');


const consolas=await get('consolas');

cargarCardsConsolasReservar(consolas,contenedor);

const mostrarFomrularioNuevaReserva=(info)=>{
  contenedorformularioNuevaReserva.classList.add('displayFlex');
  formHoraInicio.value=formatearFecha(info.startStr);
  formHoraFinalizacion.value=formatearFecha(info.endStr);
  // console.log(info.startStr);
  
}

const abrirCalendario=()=>{
    calendariOculto.classList.add('displayBlock');
    fondoOscuro.classList.add('displayBlock')

    const contenedor=document.querySelector('#calendarioReserva');
    contenedor.innerHTML="";


    const calendar = new FullCalendar.Calendar(contenedor, {
    initialView: 'timeGridWeek',
    locale: 'es',
    selectable: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek'
    },
    allDaySlot: false, // ❌ quitar la opción "todo el día"
    slotMinTime: '08:00:00', // 🕗 abre desde las 8 AM
    slotMaxTime: '22:00:00', // 🕙 hasta las 10 PM
    slotDuration: '00:30:00', // cada bloque es de 30 minutos
    slotLabelFormat: {
        hour: '2-digit',
        minute: '2-digit',
        meridiem: false, // pon 'short' si quieres AM/PM
        hour12: false      // true para formato 12 horas, false para 24h
    },
    validRange: {
    start: new Date() // ← aquí se evita mostrar fechas anteriores a hoy
  },
    events:[],
    select:(info)=>{
      const horaActual=new Date();
      const horaInicio=new Date(info.startStr)
      if(horaActual>horaInicio){
        alert('No se puede reservar en una fecha anterior a la actual');
      }else{
        mostrarFomrularioNuevaReserva(info);

      }
    }
  });
  calendar.render();
}

const cerrarCalencuario=()=>{
    calendariOculto.classList.remove('displayBlock');
    fondoOscuro.classList.remove('displayBlock');
}

window.addEventListener('click',(event)=>{
    const clase=event.target.getAttribute('class');
    if(clase=='botonReservar'){
      const id_consola=event.target.getAttribute('id');
      campoIdConsola.value=id_consola;
      abrirCalendario();
    }
    else if(clase=='botonCerrarCalendario')cerrarCalencuario();
})

const cantCamporFormulario=contarCamposFormulario(formulario);

formulario.addEventListener('submit',async(event)=>{
  const info=validar(event);

  if(Object.keys(info).length==cantCamporFormulario){
    
    const usuario=await get(`usuarios/documento/${info.documento}`)
    if(Object.keys(usuario).length>1){
      const horaActual=new Date();
      const horaInicio=new Date(info.hora_inicio);
      const horaFin=new Date(info.hora_finalizacion);
  
      if(horaActual<horaInicio)info['id_estado_reserva']=1
      else if(horaActual>=horaInicio && horaActual<horaFin)info['id_estado_reserva']=2
      else if(horaActual>=horaFin)info['id_estado_reserva']=3
      
      console.log(info);
      
    }else{
      alert("El usuario no ha sido encontrado")
    }
    
    
  }
});

console.log(botonCancel);


botonCancel.addEventListener('click',()=>{
  contenedorformularioNuevaReserva.classList.remove('displayFlex');
})