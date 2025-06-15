import { crearFila, crearTabla } from "./modules/modules.js"
import { get } from "../API.js";

const main=document.querySelector('.contenido__contenedor');



const usuarios=await get('usuarios');

if(usuarios.length>0){
    crearTabla(['Documento','Nombre','Correo','Rol'],main);
    const cuerpoTabla=document.querySelector('.tabla__cuerpo');

    usuarios.forEach(usuario => {
        console.log(usuario);
        
        crearFila([usuario.documento,usuario.nombre,usuario.correo,usuario.idRol],cuerpoTabla)
    });


    
}

const tabla=document.querySelector('.tabla');
