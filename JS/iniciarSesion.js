import { limpiar, validarContrasenia, validarIngreso, validarMinimo } from "./MODULES/modules.js";


const formulario = document.querySelector('form');
const correo=document.querySelector('#correo');
const contrasenia=document.querySelector('#contrasenia');

formulario.addEventListener('submit',validarIngreso);
correo.addEventListener('keydown',(event)=>{if(validarMinimo(event.target)) limpiar(event.target)});
contrasenia.addEventListener('keydown',(event)=>{if(validarContrasenia(event.target))limpiar(event.target)})