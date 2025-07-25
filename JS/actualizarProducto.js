import { get, post_imgs, put} from "../api.js";
import { contarCamposFormulario, limpiar, validar, validarMaximo, validarMinimo, validarNumeros } from "./MODULES/modules.js";

const formulario=document.querySelector('form');
const nombre=document.querySelector('#nombre');
const descripcion=document.querySelector('#descripcion');
const precio=document.querySelector('#precio');
const cantDis=document.querySelector('#cantidades_disponibles');
const inputImg=document.querySelector('#seleccionarImagen');

const params = new URLSearchParams(window.location.search);
const id = params.get("id");


const cantCampos=contarCamposFormulario(formulario)

const producto=await get(`productos/${id}`)

const id_img=producto.id_imagen;


nombre.value=producto.nombre;
descripcion.value=producto.descripcion;
precio.value=producto.precio;
cantDis.value=producto.cantidades_disponibles;

formulario.addEventListener('submit',async(event)=>{
    const info=validar(event);

    if(Object.keys(info).length==cantCampos){
        if(inputImg.files.length>0){
            const formData = new FormData();
            formData.append('archivo',inputImg.files[0])
            const respuesta = await post_imgs(formData);
            const response = await respuesta.json();
            info['id_imagen']=response.id_imagen
        }else{
            info['id_imagen']=id_img;
        }

        info['id_estado_producto']=1;
        if(info['cantidades_disponibles']==0) info['id_estado_producto']=2

        const respuesta=await put(`productos/${id}`,info)
        if(respuesta.ok)alert('El producto se ha actualizado correctamente')
    }
})

nombre.addEventListener('keydown',(event)=>{if(validarMinimo(event.target))limpiar(event.target)})
nombre.addEventListener('blur',(event)=>{if(validarMinimo(event.target))limpiar(event.target)});

descripcion.addEventListener('keydown',(event)=>{if(validarMinimo(event.target))limpiar(event.target)})
descripcion.addEventListener('blur',(event)=>{if(validarMinimo(event.target))limpiar(event.target)})

precio.addEventListener('keydown',(event)=>{if(validarMinimo(event.target))limpiar(event.target)});
precio.addEventListener('blur',(event)=>{if(validarMinimo(event.target))limpiar(event.target)});
precio.addEventListener('keydown',(event)=>{validarMaximo(event)});
precio.addEventListener('keydown',(event)=>{validarNumeros(event)});

cantDis.addEventListener('keydown',(event)=>{if(validarMinimo(event.target))limpiar(event.target)});
cantDis.addEventListener('blur',(event)=>{if(validarMinimo(event.target))limpiar(event.target)});
cantDis.addEventListener('keydown',(event)=>{validarNumeros(event)});
