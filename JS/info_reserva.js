import { get, post, put } from "../api.js";
import { cargarSelecrProductos, crearFila, crearTabla, quitarFOmatoIso, validar } from "./MODULES/modules.js";

const nombreUsuario=document.querySelector('.nombreUsuario');
const contenedorFomrulario=document.querySelector('.contenedorFormularioModal')
const horaInicioFin=document.querySelector('.horaInicioFin');
const cons=document.querySelector('.consola');
const precHor=document.querySelector('.precioHora');
const botonAgregarProducto=document.querySelector('.boton__tabla');
const select=document.querySelector('#id_producto');
const formulario=document.querySelector('form');
const campoCantAComprar=document.querySelector('#cantidad');
const cantDisponibles=document.querySelector('#cantDisponible');
const precioProducto=document.querySelector('#precio_unidad');
const btnSumar=document.querySelector('#sumar');
const btnRestar=document.querySelector('#restar');
const subtotal=document.querySelector('#subtotal');
const contenedorCantComprar=document.querySelector('.contenedorCampo--displayFlex');
const contenedorTabla=document.querySelector('.contenedorTabla');

cargarSelecrProductos(select);


const params = new URLSearchParams(window.location.search);
const id_reserva = params.get("id");

const consumosReserva=await get(`consumos/reserva/${id_reserva}`);
const reserva=await get(`reservas/${id_reserva}`);
const usuario=await get(`usuarios/${reserva.id_usuario}`);
const consola=await get(`consolas/${reserva.id_consola }`);
const tipoConsola=await get(`tipos/${consola.id_tipo}`);

if(consumosReserva.length>0){
    crearTabla(['producto','precio','cantidad','subtotal'],contenedorTabla);

    const cuerpoTabla=document.querySelector('.tabla__cuerpo');
    for (const consumo of consumosReserva) {
        const produc=await get(`productos/${consumo.id_producto}`);
        crearFila([produc.nombre,produc.precio,consumo.cantidad,consumo.subtotal],consumo.id,cuerpoTabla)
    }
}else{
    const mensaje=document.createElement('span');
    mensaje.classList.add('MensajeTabla');
    mensaje.textContent="Aun no hay consumos registrados"
    contenedorTabla.append(mensaje)
}

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


window.addEventListener('click', async(event)=>{
    const clase=event.target.getAttribute('class');
    
    if(clase=="btnSumarRestar sumar"){
        const producto=await get(`productos/${select.value}`);
        const maximo=producto.cantidades_disponibles;
        if(cantidades<maximo){
            cantidades++;
            campoCantAComprar.value=cantidades;
            subtotal.value=(cantidades*producto.precio)
            if(cantidades>0){
                if(contenedorCantComprar.nextElementSibling)contenedorCantComprar.nextElementSibling.remove();
            }
        }
    }
    else if(clase=="btnSumarRestar restar"){
        const producto=await get(`productos/${select.value}`);
        if(cantidades>0){
            cantidades--;
            campoCantAComprar.value=cantidades;
            subtotal.value=(cantidades*producto.precio)
        }
    }
    else if(clase=="formulario__boton formulario__boton--cancelar"){
        select.value=0;
        cantDisponibles.textContent=0;
        precioProducto.textContent=0;
        campoCantAComprar.value=0;
        subtotal.textContent=0;
        cerrarFomrularioAgregarProducto();
    }
    
})

const cerrarFomrularioAgregarProducto=()=>{
    contenedorFomrulario.classList.remove('displayFlex');
}

select.addEventListener('change',async(event)=>{
    cantidades=0;
    const id=event.target.value;
    campoCantAComprar.value=0;
    cantDisponibles.textContent=0;
    precioProducto.textContent=0;

    if(id!=0){
        btnRestar.disabled=false;
        btnSumar.disabled=false;
        const producto=await get(`productos/${id}`);
        cantDisponibles.textContent=producto.cantidades_disponibles;
        precioProducto.textContent=`$${producto.precio}`   
    }else{
        btnRestar.disabled=true;
        btnSumar.disabled=true;
    }
})

formulario.addEventListener('submit',async(event)=>{
    event.preventDefault();
    if(campoCantAComprar.value>0){
        if(contenedorCantComprar.nextElementSibling)contenedorCantComprar.nextElementSibling.remove();
        const info=validar(event);
        info['id_reserva']=Number(id_reserva);
        info['cantidad']=Number(info['cantidad']);
        info['id_producto']=Number(info['id_producto'])
        info['subtotal']=Number(info['subtotal'])
        
        const producto=await get(`productos/${info['id_producto']}`);
        producto['cantidades_disponibles']=producto['cantidades_disponibles']-info['cantidad'];

        const res=await put(`productos/${producto.id}`,producto);
        if(res.ok){
            const respuesta=await post('consumos',info);
            if(respuesta.ok){
                Swal.fire({
                    title: 'Exito',
                    text: 'El producto se agrego correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                })
                select.value=0;
                cantDisponibles.textContent=0;
                precioProducto.textContent=0;
                campoCantAComprar.value=0;
                subtotal.textContent=0;
                cerrarFomrularioAgregarProducto();
            }
        }
    }else{
        if(contenedorCantComprar.nextElementSibling)contenedorCantComprar.nextElementSibling.remove();
        const span=document.createElement('span');
        span.textContent="la cantidad minima para comprar es 1";
        contenedorCantComprar.insertAdjacentElement('afterend',span);
    }
})