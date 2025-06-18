import { post } from "../api.js";
import { contarCamposFormulario, limpiar, validar, validarContrasenia, validarCorreo, validarLetras, validarMaximo, validarMinimo, validarNumeros } from "./MODULES/modules.js";


const formulario=document.querySelector('form');
const documento=document.querySelector('#documento')
const nombre=document.querySelector('#nombre');
const telefono=document.querySelector('#telefono');
const correo=document.querySelector('#correo');
const contrasenia=document.querySelector('#contrasenia');

const cantidadCampos=contarCamposFormulario(formulario);

const nuevoUsuario=async(event)=>{
    if(Object.keys(validar(event)).length==cantidadCampos){
        let objeto=validar(event);
        objeto['id_rol']=2; 
        objeto['telefono'] = Number(objeto['telefono']);
        objeto['documento'] = Number(objeto['documento']);
        
        const respuesta=await post('usuarios',objeto);
        if(respuesta.ok){
            alert("usuario creado correctamente");
            documento.value="";
            nombre.value="";
            telefono.value="";
            correo.value="";
            contrasenia.value="";
        }
        else alert("no se pudo crear el usuario");
    }
}

formulario.addEventListener('submit',nuevoUsuario)
nombre.addEventListener('keydown',validarLetras);
telefono.addEventListener('keydown',validarNumeros);
telefono.addEventListener('keydown',validarMaximo);
telefono.addEventListener('blur',(event)=>{if(validarMinimo(event.target))limpiar(event.target)})
documento.addEventListener('keydown',validarNumeros);
documento.addEventListener('keydown',validarMaximo);
documento.addEventListener('blur',(event)=>{if(validarMinimo(event.target))limpiar(event.target)})
nombre.addEventListener('keydown',(event)=>{if(validarMinimo(event.target))limpiar(event.target)});
nombre.addEventListener('blur',(event)=>{if(validarMinimo(event.target))limpiar(event.target)})
correo.addEventListener('blur',(event)=>{if(validarCorreo(event.target))limpiar(event.target)})
telefono.addEventListener('keydown',(event)=>{if(validarMinimo(event.target))limpiar(event.target)});
documento.addEventListener('keydown',(event)=>{if(validarMinimo(event.target))limpiar(event.target)});
correo.addEventListener('keydown',(event)=>{if(validarCorreo(event.target))limpiar(event.target)});
contrasenia.addEventListener('keydown',(event)=>{if(validarContrasenia(event.target))limpiar(event.target)});
contrasenia.addEventListener('blur',(event)=>{if(validarContrasenia(event.target))limpiar(event.target)});


