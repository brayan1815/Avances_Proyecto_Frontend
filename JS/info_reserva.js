import { get } from "../api.js";
import { cargarSelecrProductos, quitarFOmatoIso } from "./MODULES/modules.js";

const nombreUsuario=document.querySelector('.nombreUsuario');
const contenedorFomrulario=document.querySelector('.contenedorFormularioModal')
const horaInicioFin=document.querySelector('.horaInicioFin');
const cons=document.querySelector('.consola');
const precHor=document.querySelector('.precioHora');
const botonAgregarProducto=document.querySelector('.boton__tabla');
const select=document.querySelector('#producto');
const formulario=document.querySelector('form');
const campoCantAComprar=document.querySelector('#cantidad');

cargarSelecrProductos(select);

const params = new URLSearchParams(window.location.search);
const id_reserva = params.get("id");

const reserva=await get(`reservas/${id_reserva}`);
const usuario=await get(`usuarios/${reserva.id_usuario}`);
const consola=await get(`consolas/${reserva.id_consola }`);
const tipoConsola=await get(`tipos/${consola.id_tipo}`);

botonAgregarProducto.disabled=false;

if(reserva.id_estado_reserva ==1 || reserva.id_estado_reserva==3){
    botonAgregarProducto.classList.add('boton-deshabilitado');
    botonAgregarProducto.disabled=true; 
}

botonAgregarProducto.addEventListener('click',()=>{
    contenedorFomrulario.classList.add('displayFlex');
})

nombreUsuario.textContent=usuario.nombre;
horaInicioFin.textContent=`${quitarFOmatoIso(reserva.hora_inicio)} - ${quitarFOmatoIso(reserva.hora_finalizacion)}`;
cons.textContent=consola.nombre;
precHor.textContent=`$${tipoConsola.precio_hora} c/h`;

let cantidades=0;

window.addEventListener('click',(event)=>{
    const clase=event.target.getAttribute('class');

    if(clase=="btnSumarRestar sumar"){
        cantidades++;
        campoCantAComprar.value=cantidades;
    }
    else if(clase=="btnSumarRestar restar"){
        if(cantidades>0){
            cantidades--;
            campoCantAComprar.value=cantidades;
        }
    }
    
})

select.addEventListener('change',async(event)=>{
    const id=event.target.value;

    if(id!=0){
        const producto=await get(`productos/${id}`);
        
        
    }
})
