import { get, put } from "../api.js";
import { contarCamposFormulario, validar,validarMinimo,limpiar,validarMaximo } from "./MODULES/modules.js";

const formulario=document.querySelector('form');
const inputTipo=document.querySelector('#tipo');
const inputPrecio=document.querySelector('#precio_hora');

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const tipo= await get(`tipos/${id}`)

inputTipo.value=tipo.tipo;
inputPrecio.value=tipo.precio_hora;

const cantCampos=contarCamposFormulario(formulario);

formulario.addEventListener('submit',async(event)=>{
    const info=validar(event);

    if(Object.keys(info).length==cantCampos){
        const respuesta=await put(`tipos/${id}`,info)
        if(respuesta.ok)alert('El tipo se ha acutualizar correctamente')
    }
})

inputTipo.addEventListener('keydown',(event)=>{if(validarMinimo(event.target))limpiar(event.target)})
inputTipo.addEventListener('blur',(event)=>{if(validarMinimo(event.target))limpiar(event.target)})
inputTipo.addEventListener('keydown',validarMaximo);

inputPrecio.addEventListener('keydown',(event)=>{if(validarMinimo(event.target))limpiar(event.target)})
inputPrecio.addEventListener('blur',(event)=>{if(validarMinimo(event.target))limpiar(event.target)})
inputPrecio.addEventListener('keydown',validarMaximo);