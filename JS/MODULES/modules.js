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

export const crearFila=(info,id,contenedor)=>{
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
    botonEditar.setAttribute('id',id);

    const iconoEditar=document.createElement('i');
  iconoEditar.classList.add('bi', 'bi-pencil-square');
  botonEliminar.setAttribute('id',id)

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
  let minimo = 0;
  

  if (campo.tagName == "INPUT") {
    minimo = campo.getAttribute('min');
  }
  else if (campo.tagName == 'TEXTAREA') {
    minimo = campo.getAttribute('minlength');
  }
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

export const validarImagen=(campo,label)=>{
  if(campo.hasAttribute('required')){
    if(campo.files.length<1){
      const mensaje=document.createElement('span');
      mensaje.textContent="Debe seleccionar una imagen";
  
      if(label.nextElementSibling)label.nextElementSibling.remove();
      label.classList.add('border--punteado--red')
      label.insertAdjacentElement('afterend',mensaje);
      return false;
    } 
  }
  else {
    if (label.nextElementSibling) label.nextElementSibling.remove();
    label.classList.remove('border--punteado--red')
    const mensaje = document.createElement('span');
    mensaje.textContent = campo.files[0].name;
    mensaje.classList.add('span--verde')
    label.insertAdjacentElement('afterend',mensaje)
    return campo.files[0];
  }
}

export const contarCamposFormulario=(formulario)=>{
  const campos=[...formulario].filter((campo)=>campo.hasAttribute('required'));
  return campos.length;
}

export const crearCardsProductos=async (productos,contenedor)=>{

  for (const producto of productos) {
    const imagen= await get(`imagenes/${producto.id_imagen}`);
    // const urlImagen=`http://localhost:8080/APIproyecto/imagenes/${imagen.ruta}`;
    const card=document.createElement('div');
    card.setAttribute('id',producto.id)
    card.classList.add('card');
  
    const imagenCard=document.createElement('img');
    imagenCard.setAttribute('src', `http://localhost:8080/APIproyecto/${imagen.ruta}`);
    imagenCard.classList.add('card__imagen');
    card.append(imagenCard)

    const lineaSeparadora=document.createElement('hr');
    lineaSeparadora.classList.add('card__linea');
    card.append(lineaSeparadora);

    const cardNombre=document.createElement('h3');
    cardNombre.classList.add('card__nombre');
    cardNombre.textContent=producto.nombre;
    card.append(cardNombre);

    const cardDescripcion=document.createElement('p');
    cardDescripcion.classList.add('card__descripcion');
    cardDescripcion.textContent=producto.descripcion;
    card.append(cardDescripcion);

    const cardPrecio=document.createElement('h3');
    cardPrecio.classList.add('card__precio');
    cardPrecio.textContent=`$${producto.precio}`;
    card.append(cardPrecio);

    const cantRest=document.createElement('h3');
    cantRest.classList.add('card__cantidades');
    cantRest.textContent=`Cantidades restantes: ${producto.cantidades_disponibles}`;
    card.append(cantRest);

    const contenedorBotones=document.createElement('div');
    contenedorBotones.classList.add('card__botones');

    const botonEditar=document.createElement('button');
    botonEditar.setAttribute('id',producto.id);
    botonEditar.classList.add('card__boton','editar');

    const iconoEditar=document.createElement('i');
    iconoEditar.classList.add('bi','bi-pencil-square');
    // iconoEditar.classList.add('bi','bi-pencil-square')
    botonEditar.append(iconoEditar);
    contenedorBotones.append(botonEditar);

    const botonEliminar=document.createElement('button');
    botonEliminar.setAttribute('id',producto.id)
    botonEliminar.classList.add('card__boton','eliminar');

    const iconoEliminar=document.createElement('i');
    iconoEliminar.classList.add('bi','bi-trash-fill');
    botonEliminar.append(iconoEliminar);
    contenedorBotones.append(botonEliminar);

    card.append(contenedorBotones);

    contenedor.append(card);
  }
}

export const validar = (event) => {
  
  event.preventDefault();
  
  const campos = [...event.target].filter((item) => item.hasAttribute('required'));
  const inputText = campos.filter((campo) => campo.tagName == 'INPUT' && campo.getAttribute('type') == 'text')
  const inputContrasenia=campos.filter((campo) => campo.tagName == 'INPUT' && campo.getAttribute('type') == 'password')
  const selects = campos.filter((campo) => campo.tagName == 'SELECT');
  const textAreas = campos.filter((campo) => campo.tagName == 'TEXTAREA');
  
  
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

  if(textAreas.length > 0){
    textAreas.forEach(textArea => {
      if (validarMinimo(textArea)) {
        info[textArea.getAttribute('id')] = textArea.value;
      }
    })
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