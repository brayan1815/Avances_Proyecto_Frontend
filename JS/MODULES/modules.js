import { get } from "../../api.js";

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

export const crearFila=(info,id_usuario,contenedor)=>{
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

    const botonEliminar=document.createElement('button');
    botonEliminar.classList.add('registro__boton','registro__boton--eliminar')

    const iconoEliminar=document.createElement('i');
    iconoEliminar.classList.add('bi','bi-trash-fill');

    botonEliminar.append(iconoEliminar);
    contenedorBotones.append(botonEliminar);

    const botonEditar=document.createElement('button');
    botonEditar.classList.add('registro__boton','registro__boton--editar')
    botonEditar.setAttribute('id',id_usuario);

    const iconoEditar=document.createElement('i');
    iconoEditar.classList.add('bi','bi-pencil-square');

    botonEditar.append(iconoEditar);
    contenedorBotones.append(botonEditar);

    campo.append(contenedorBotones);
    fila.append(campo)

    contenedor.append(fila);
}

export const limpiar=(campo)=>{
  if(campo.nextElementSibling)campo.nextElementSibling.remove();
  campo.classList.remove('border--red');
}


export const validarMinimo = (campo)=> {
  const texto = campo.value;
  const minimo = campo.getAttribute('min');

  if (texto.length < minimo) {
    const span = document.createElement('span');
    span.textContent = `El campo ${campo.getAttribute('id')} debe tener minimo ${minimo} caracteres`
    
    if (campo.nextElementSibling) campo.nextElementSibling.remove();
    campo.insertAdjacentElement('afterend', span)
    campo.classList.add('border--red');
    return false;
  } else {
    return true
  }
}

export const validarContrasenia = (campo) => {
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

const validarContraseniaUsuario =(userCorreo,userCont,usuarios) => {
  userCorreo=userCorreo.toLowerCase();

  for (let n = 0; n < usuarios.length; n++){ 
    if (usuarios[n].correo == userCorreo && usuarios[n].contrasenia==userCont) return usuarios[n].id;
  }

  return false;
}

export const validarLetras=(event)=>{
  let tecla=event.key;
    const letras=/[a-zñáéíóú\s]/i;
    if(!letras.test(tecla)&& tecla!="Backspace"){
        event.preventDefault();
    }
}

export const validarNumeros=(event)=>{
  let tecla=event.key;
    const numeros=/[0-9]/;
    if(!numeros.test(tecla) && tecla!="Backspace"){
    event.preventDefault();
  }
}

export const validarMaximo=(event)=>{
  const maximo=event.target.getAttribute('max');

  if(event.target.value.length>=maximo && event.key!='Backspace')event.preventDefault();
}

export const validarCorreo=(campo)=>{
  const expresionCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if(campo.value.match(expresionCorreo)) return true
  else{
    if(campo.nextElementSibling)campo.nextElementSibling.remove();

    const span=document.createElement('span');
    span.textContent="El correo ingresado no es valido";
    campo.insertAdjacentElement('afterend',span);
    campo.classList.add('border--red');

    return false
  }
}

export const contarCamposFormulario=(formulario)=>{
  const campos=[...formulario].filter((campo)=>campo.hasAttribute('required'));
  return campos.length;
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
        if(campo.getAttribute('id')=='correo'){
          if(validarCorreo(campo)){
            info[campo.getAttribute('id')] = campo.value.toLowerCase();
          }
        }else{
          info[campo.getAttribute('id')] = campo.value;
        }
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
    selects.forEach(select => {
      if (select.value == 0) {
        if (select.nextElementSibling)nextElementSibling.remove();
        const mensaje = document.createElement('span');
        mensaje.textContent = "Debe seleccionar un rol de usuario";
        select.insertAdjacentElement('afterend',mensaje)
      } else {
        info[select.getAttribute('id')] = select.value;
      }
    });
  }
  return info;
}

export const validarIngreso = async (event) => {
  const datos = await validar(event);
  const usuarios = await get('usuarios');
  if (Object.keys(datos).length == 2) {
    if (validarContraseniaUsuario(datos.correo, datos.contrasenia, usuarios)!=false) {
      alert('el usuario puede ingresar ')
      const id=validarContraseniaUsuario(datos.correo, datos.contrasenia, usuarios);

      window.location.href=`reservas.html?id=${encodeURIComponent(id)}`
    }else{
      alert('El correo o la contraseña ingresados no son correctos')
    }
  }
}

export const cargarSelectRoles = async(select) => {
  const roles = await get('roles');

  roles.forEach(rol => {
    const valor = document.createElement('option');
    valor.setAttribute('value', rol.id)
    valor.textContent = rol.rol;
    select.append(valor);
  });
  

}