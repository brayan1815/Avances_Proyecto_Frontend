import { get } from "../../api.js";
import Swal from 'sweetalert2';

export const crearTabla=(encabezados,contenedor)=>{
    const tabla=document.createElement('table');
    tabla.classList.add('tabla');

    const encabezado=document.createElement('thead');
    const cuerpo=document.createElement('tbody');
    cuerpo.classList.add('tabla__cuerpo')
    encabezado.classList.add('tabla__encabezado');

    const fila=document.createElement('tr');

    encabezados.forEach(item => {
        const campo=document.createElement('th');
        campo.textContent=item;
        fila.append(campo);
    });
    encabezado.append(fila)
    tabla.append(encabezado,cuerpo)
    
    contenedor.append(tabla)
}

export const crearFila=(info,contenedor)=>{
    const fila=document.createElement('tr');
    fila.classList.add('tabla__fila');

    info.forEach(item => {
        const campo=document.createElement('td');
        campo.classList.add('tabla__campo');
        campo.textContent=item;
        fila.append(campo);
    });

    const campo=document.createElement('td');
    campo.classList.add('tabla__campo');

    const contenedorBotones=document.createElement('div');
    contenedorBotones.classList.add('contenedorBotonesTabla');

    const botonEliminar=document.createElement('a');
    botonEliminar.classList.add('registro__boton','registro__boton--eliminar')

    const iconoEliminar=document.createElement('i');
    iconoEliminar.classList.add('bi','bi-trash-fill');

    botonEliminar.append(iconoEliminar);
    contenedorBotones.append(botonEliminar);

    const botonEditar=document.createElement('a');
    botonEditar.classList.add('registro__boton','registro__boton--editar')

    const iconoEditar=document.createElement('i');
    iconoEditar.classList.add('bi','bi-pencil-square');

    botonEditar.append(iconoEditar);
    contenedorBotones.append(botonEditar);

    campo.append(contenedorBotones);
    fila.append(campo)

    contenedor.append(fila);
}

const validarMinimo = (campo)=> {
  const texto = campo.value;
  const minimo = campo.getAttribute('min');

  if (texto.length < minimo) {
    const span = document.createElement('span');
    span.textContent = `El campo ${campo.getAttribute('id')} debe tener minimo ${minimo} caracteres`
    
    if (campo.nextElementSibling) campo.nextElementSibling.remove();
    campo.insertAdjacentElement('afterend', span)
    campo.classList.add('border--red');
  } else {
    return true
  }
}

const validarContrasenia = (campo) => {
  const contrasenia = campo.value;
  const expresion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;
  
  if (!contrasenia.match(expresion)) {
    if (campo.nextElementSibling) campo.nextElementSibling.remove();
    let mensaje = document.createElement('span')
    mensaje.textContent = 'la contraseña debe tener minimo una mayuscula, una minuscula, un caracter especial y 8 caracteres';
    campo.insertAdjacentElement('afterend', mensaje)
    campo.classList.add('border--red')
    return false;
  }
  return true;
}

const validarContraseniaUsuario = async (userName,userCont,usuarios) => {
  for (let n = 0; n < usuarios.length; n++){
    if (usuario[n].nombre == userName && usuarios[n].contrasenia==userCont) return true;
  }
  return false;
}

export const validar = (event) => {
  event.preventDefault();
  
  const campos = [...event.target].filter((item) => item.hasAttribute('required'));
  const inputText = campos.filter((campo) => campo.tagName == 'INPUT' && campo.getAttribute('type') == 'text')
  const inputContrasenia=campos.filter((campo) => campo.tagName == 'INPUT' && campo.getAttribute('type') == 'password')
  const selects = campos.filter((campo) => campo.tagName == 'SELECT');
  
  let info = {};
  if (inputText.length > 0) {
    inputText.forEach(campo => {
      if (validarMinimo(campo)) {
        info[campo.getAttribute('id')] = campo.value;
      }
    });
  }


  if (inputContrasenia.length > 0) {
    inputContrasenia.forEach(campo => {
      if (validarContrasenia(campo)) {
        info[campo.getAttribute('id')] = campo.value;
      }
    });
  }


  if (selects.length > 0) {
    
  }
  console.log(info);
  
  return info;
}

export const validarIngreso = async (event) => {
  const datos = await validar(event);
  const usuarios = await get('usuarios');
  if (Object.keys(datos).length == 2) {
    if (validarContraseniaUsuario(datos.nombre, datos.contrasenia, usuarios)) {
      Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
  }
}