import { get } from "../api.js";
import {validarIngreso} from "./MODULES/modules.js";

const select = document.querySelector('select');
const formulario = document.querySelector('form');


const roles=await get('roles');

roles.forEach(item => {
    const option=document.createElement('option');
    option.setAttribute('value',item.id)
    option.textContent=item.rol;
    select.append(option);
});

formulario.addEventListener('submit',validarIngreso)

