import { post_imgs } from "../api.js";
import { validarImagen } from "./MODULES/modules.js";

const formulario=document.querySelector('form');
const inputImg=document.querySelector('#seleccionarImagen');
const labelImagen=document.querySelector('.formulario__insertarImagen')


formulario.addEventListener('submit',async(event)=>{
    event.preventDefault();

    const imagen=validarImagen(inputImg,labelImagen);

    if(imagen!=false){
        const formData = new FormData();
        formData.append('archivo',imagen)
        const respuesta=await post_imgs(formData);
        console.log(respuesta);  
    }

})


