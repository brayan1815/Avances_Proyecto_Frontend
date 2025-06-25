import { post_imgs } from "../api.js";
import { validarImagen } from "./MODULES/modules.js";

const formulario=document.querySelector('form');
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

    const imagen=validarImagen(inputImg,labelImagen);

    if(imagen!=false){
        const formData = new FormData();
        formData.append('archivo',imagen)
      const respuesta = await post_imgs(formData);
      const response = await respuesta.json();
        console.log( response.id);  
    }

})



