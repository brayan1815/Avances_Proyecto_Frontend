import { get } from "../api.js";
import { quitarFOmatoIso } from "./MODULES/modules.js";

const nombreUsuario=document.querySelector('.nombreUsuario');
const horaInicioFin=document.querySelector('.horaInicioFin');
const cons=document.querySelector('.consola');
const precHor=document.querySelector('.precioHora');

const params = new URLSearchParams(window.location.search);
const id_reserva = params.get("id");

const reserva=await get(`reservas/${id_reserva}`);
const usuario=await get(`usuarios/${reserva.id_usuario}`);
const consola=await get(`consolas/${reserva.id_consola }`);
const tipoConsola=await get(`tipos/${consola.id_tipo}`);

nombreUsuario.textContent=usuario.nombre;
horaInicioFin.textContent=`${quitarFOmatoIso(reserva.hora_inicio)} - ${quitarFOmatoIso(reserva.hora_finalizacion)}`;
cons.textContent=consola.nombre;
precHor.textContent=`$${tipoConsola.precio_hora} c/h`





console.log(id_reserva);
