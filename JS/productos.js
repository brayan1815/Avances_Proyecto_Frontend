import { get } from "../api.js";
import { crearCardsProductos } from "./MODULES/modules.js";

const contenedorCards=document.querySelector('#cards');

const productos=await get('productos')

// window.addEventListener('DOMContentLoaded',()=>{
//     crearCardsProductos(productos,contenedorCards);
// })

crearCardsProductos(productos,contenedorCards);