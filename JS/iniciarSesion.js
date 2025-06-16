import { validarIngreso } from "./MODULES/modules.js";


const formulario = document.querySelector('form');

formulario.addEventListener('submit',validarIngreso)