import { get } from "../api.js";

const nombre=document.querySelector('#nombre')
const telefono=document.querySelector('#telefono')
const correo=document.querySelector('#correo')
const contrasenia=document.querySelector('#contrasenia')
const rol=document.querySelector('select')
console.log(rol);



const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const usuario=await get(`usuarios/${id}`);


nombre.value=usuario.nombre
telefono.value=usuario.telefono
correo.value=usuario.correo
contrasenia.value=usuario.contrasenia
rol.value=usuario.id





