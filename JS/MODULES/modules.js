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