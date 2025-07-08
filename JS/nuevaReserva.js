import { get } from "../api.js";
import { cargarCardsConsolasReservar } from "./MODULES/modules.js";

const contenedor=document.querySelector('.cards--consolas');
const calendariOculto=document.querySelector('.calendariOculto');
const fondoOscuro=document.querySelector('.fondoOscuro');

const consolas=await get('consolas');

cargarCardsConsolasReservar(consolas,contenedor)

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

    events:[]
  });
  calendar.render();
}

const cerrarCalencuario=()=>{
    calendariOculto.classList.remove('displayBlock');
    fondoOscuro.classList.remove('displayBlock');
}

window.addEventListener('click',(event)=>{
    const clase=event.target.getAttribute('class');

    if(clase=='botonReservar')abrirCalendario();
    else if(clase=='botonCerrarCalendario')cerrarCalencuario();
})
