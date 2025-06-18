import { crearFila, crearTabla } from "./modules/modules.js"
import { get } from "../API.js";

const main=document.querySelector('.contenido__contenedor');



const usuarios=await get('usuarios');

if(usuarios.length>0){
    crearTabla(['Documento','Nombre','Correo','Rol'],main);
    const cuerpoTabla=document.querySelector('.tabla__cuerpo');
    
    usuarios.forEach(usuario => {; 
        crearFila([usuario.documento,usuario.nombre,usuario.correo,usuario.id_rol],usuario.id,cuerpoTabla)
    });
    
    
    
}

const tabla=document.querySelector('.tabla');

window.addEventListener('click',(event)=>{
    if(event.target.getAttribute('class')=='registro__boton registro__boton--editar'){
        const id=event.target.getAttribute('id');       
        window.location.href=`actualizarUsuario.html?id=${encodeURIComponent(id)}`
    }
})



