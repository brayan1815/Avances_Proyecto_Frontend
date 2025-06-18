import { get } from "../api.js";


const nombreUsuario=document.querySelector('.encabezadoPerfil__nombre');

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const usuario=await get(`usuarios/${id}`);

nombreUsuario.textContent=usuario.nombre;


