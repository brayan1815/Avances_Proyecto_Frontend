import { post_imgs } from "../api.js";
import { contarCamposFormulario, limpiar, validar, validarImagen, validarMinimo } from "./MODULES/modules.js";

const formulario = document.querySelector('form');
const nombreprod = document.querySelector('#nombre')
const descripcionProd=document.querySelector('#descripcion')
const inputImg=document.querySelector('#seleccionarImagen');
const labelImagen = document.querySelector('.formulario__insertarImagen')
const camposForm = document.querySelectorAll('input');

camposForm.forEach((campo) => {
  campo.addEventListener('focus', () => {
    validarImagen(inputImg,labelImagen)
  })
})



inputImg.addEventListener('focusout',()=>{validarImagen(inputImg,labelImagen)});

formulario.addEventListener('submit',async(event)=>{
  event.preventDefault();

  const imagen = validarImagen(inputImg, labelImagen);
  const cantCamposFormulario = contarCamposFormulario(event.target);
  const info=validar(event);
  

  if(imagen!=false){
    const formData = new FormData();
    formData.append('archivo',imagen)
    const respuesta = await post_imgs(formData);
    const response = await respuesta.json();
    if (Object.keys(info).length == cantCamposFormulario) {
      console.log(info);
    }
  }
})

nombreprod.addEventListener('blur', (event) => { if (validarMinimo(event.target)) limpiar(event.target) });
nombreprod.addEventListener('keydown', (event) => { if (validarMinimo(event.target)) limpiar(event.target) });

descripcionProd.addEventListener('blur',(event)=>{if(validarMinimo(event.target)) limpiar(event.target)})





