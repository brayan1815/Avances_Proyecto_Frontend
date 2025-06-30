import { post } from "../api.js";
import { contarCamposFormulario, limpiar, validar, validarMaximo, validarMinimo } from "./MODULES/modules.js";

const formulario=document.querySelector('form');
const inputTipo=document.querySelector('#tipo');
const inputPrecio=document.querySelector('#precio_hora');

const camposForm=contarCamposFormulario(formulario);

formulario.addEventListener('submit',async(event)=>{
    const info=validar(event);

    if(Object.keys(info).length==camposForm){
        info['precio_hora']=Number(info['precio_hora'])
        const respuesta=await post('tipos',info)
        if(respuesta.ok) alert('El tipo se creo correctamente')
    }
})

inputTipo.addEventListener('keydown',(event)=>{if(validarMinimo(event.target))limpiar(event.target)})
inputTipo.addEventListener('blur',(event)=>{if(validarMinimo(event.target))limpiar(event.target)})
inputTipo.addEventListener('keydown',validarMaximo);

inputPrecio.addEventListener('keydown',(event)=>{if(validarMinimo(event.target))limpiar(event.target)})
inputPrecio.addEventListener('blur',(event)=>{if(validarMinimo(event.target))limpiar(event.target)})
inputPrecio.addEventListener('keydown',validarMaximo);